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
import { useEffect } from 'react'
import { useForm } from '@tanstack/react-form'
import { createExperienceGroupSchema } from '@portofolio/schema/experience.schema'
import { newGroupSchema, refreshAfterCommit } from '@/lib/experience-position-form'

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
  const create = useMutation(
    trpc.experience.createGroup.mutationOptions({
      onError: (error) => globalErrorToast(error.message),
    }),
  )
  const form = useForm({
    defaultValues: { label: '' },
    validators: {
      onChange: newGroupSchema(() => company),
    },
    onSubmit: async ({ value: submitted }) => {
      // useForm updates its options each render: validate the latest parent company.
      const group = await create.mutateAsync(
        createExperienceGroupSchema.parse({ company, label: submitted.label }),
      )
      onChange(group.id)
      await refreshAfterCommit(
        () => queryClient.invalidateQueries(trpc.experience.getGroups.queryFilter()),
        () => globalErrorToast(messages.loadError),
      )
      form.reset()
    },
  })
  useEffect(() => {
    if (form.state.fieldMeta.label?.isTouched || form.state.submissionAttempts > 0) {
      void form.validate('change')
    }
  }, [company, form])
  const selected = groups.data?.find((group) => group.id === value)
  const mismatch = !!selected && selected.company.trim() !== company.trim()
  const options =
    groups.data?.filter((group) => group.company.trim() === company.trim() || group.id === value) ??
    []

  return (
    <form.Subscribe
      selector={(state) => [state.isSubmitting, state.canSubmit, state.values.label] as const}
    >
      {([pending, canSubmit, label]) => (
        <FieldGroup>
          <Field data-invalid={mismatch}>
            <FieldLabel htmlFor="experience-group">{messages.label}</FieldLabel>
            <Select
              value={value ?? 'none'}
              onValueChange={(id) => onChange(id === 'none' ? null : id)}
              disabled={pending}
            >
              <SelectTrigger
                id="experience-group"
                aria-invalid={mismatch}
                aria-describedby="experience-group-help"
              >
                <SelectValue>
                  {selected
                    ? `${selected.company} - ${selected.label}`
                    : value
                      ? messages.label
                      : messages.none}
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
          <form.Field name="label">
            {(field) => (
              <Field data-invalid={!field.state.meta.isValid}>
                <FieldLabel htmlFor="experience-group-label">{messages.newLabel}</FieldLabel>
                <Input
                  id="experience-group-label"
                  name={field.name}
                  value={field.state.value}
                  maxLength={256}
                  placeholder={messages.placeholder}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={!field.state.meta.isValid}
                  disabled={pending}
                />
                <FieldError errors={field.state.meta.errors} />
                {create.isError && <FieldError role="alert">{create.error.message}</FieldError>}
                <Button
                  type="button"
                  variant="outline"
                  disabled={
                    !company.trim() ||
                    company.trim().length > 256 ||
                    !label.trim() ||
                    pending ||
                    !canSubmit
                  }
                  onClick={async () => {
                    if (form.state.isSubmitting) return
                    try {
                      await form.handleSubmit()
                    } catch {
                      // Keep values and the mutation error available for retry.
                    }
                  }}
                >
                  {messages.create}
                </Button>
              </Field>
            )}
          </form.Field>
        </FieldGroup>
      )}
    </form.Subscribe>
  )
}
