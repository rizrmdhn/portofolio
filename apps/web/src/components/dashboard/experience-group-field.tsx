import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTranslations } from '@/i18n/locale-context'
import { globalErrorToast } from '@/lib/toasts'
import { trpc } from '@/utils/trpc'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export function ExperienceGroupField({
  company,
  value,
  onChange,
}: {
  company: string
  value: string | null
  onChange: (value: string | null) => void
}) {
  const { t } = useTranslations()
  const messages = t.experienceGroup
  const queryClient = useQueryClient()
  const groups = useQuery(trpc.experience.getGroups.queryOptions())
  const [label, setLabel] = useState('')
  const create = useMutation(
    trpc.experience.createGroup.mutationOptions({
      onSuccess: async (group) => {
        await queryClient.invalidateQueries(trpc.experience.getGroups.queryFilter())
        onChange(group.id)
        setLabel('')
      },
      onError: (error) => globalErrorToast(error.message),
    }),
  )
  const selected = groups.data?.find((group) => group.id === value)
  const mismatch = !!selected && selected.company.trim() !== company.trim()
  const options =
    groups.data?.filter((group) => group.company.trim() === company.trim() || group.id === value) ?? []

  return (
    <FieldGroup>
      <Field data-invalid={mismatch}>
        <FieldLabel htmlFor="experience-group">{messages.label}</FieldLabel>
        <Select
          value={value ?? 'none'}
          onValueChange={(id) => onChange(id === 'none' ? null : id)}
          disabled={create.isPending}
        >
          <SelectTrigger
            id="experience-group"
            aria-invalid={mismatch}
            aria-describedby="experience-group-help"
          >
            <SelectValue>
              {selected
                ? `${selected.company} - ${selected.label}`
                : (value ? messages.label : messages.none)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="none">{messages.none}</SelectItem>
              {options.map((group) => (
                <SelectItem key={group.id} value={group.id}>
                  {group.company} - {group.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <FieldDescription id="experience-group-help">{messages.help}</FieldDescription>
        {mismatch && <FieldError>{messages.mismatch}</FieldError>}
        {groups.isError && <FieldError>{messages.loadError}</FieldError>}
        {groups.isError && (
          <Button type="button" variant="outline" onClick={() => void groups.refetch()}>
            {messages.retry}
          </Button>
        )}
      </Field>
      <Field>
        <FieldLabel htmlFor="experience-group-label">{messages.newLabel}</FieldLabel>
        <Input
          id="experience-group-label"
          value={label}
          maxLength={256}
          placeholder={messages.placeholder}
          onChange={(event) => setLabel(event.target.value)}
          disabled={create.isPending}
        />
        <Button
          type="button"
          variant="outline"
          disabled={
            !company.trim() || company.trim().length > 256 || !label.trim() || create.isPending
          }
          onClick={() => create.mutate({ company, label })}
        >
          {messages.create}
        </Button>
      </Field>
    </FieldGroup>
  )
}
