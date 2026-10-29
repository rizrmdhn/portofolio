import { invalidatePositionQueries } from '@/lib/experience-position-cache'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { IconPlus } from '@tabler/icons-react'
import { format } from 'date-fns'
import { enUS, id } from 'date-fns/locale'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { addExperiencePositionSchema } from '@portofolio/schema/experience.schema'
import type { AddExperiencePositionInput } from '@portofolio/schema/experience.schema'
import {
  EXPERIENCE_STATUS_LABELS,
  EXPERIENCE_STATUS_TYPES,
  EXPERIENCE_TYPES,
  EXPERIENCE_TYPE_LABELS,
} from '@portofolio/constants'
import type { Experience } from '@portofolio/types/experience.types'
import { useLocale, useTranslations } from '@/i18n/locale-context'
import { trpc } from '@/utils/trpc'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function ExperienceCareerHistory({
  source,
  disabled,
  onSaved,
}: {
  source: Experience
  disabled: boolean
  onSaved: (groupId: string | null) => void
}) {
  const { t } = useTranslations()
  const locale = useLocale() === 'id' ? id : enUS
  const m = t.experiencePosition
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const history = useQuery(trpc.experience.getForDashboard.queryOptions({}))
  const roles = (source.groupId
    ? history.data?.filter((role) => role.groupId === source.groupId)
    : undefined) ?? [source]
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!busy) setOpen(value)
      }}
    >
      <section className="flex min-w-0 flex-col gap-4" aria-labelledby="career-history-title">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-col gap-1">
            <h3 id="career-history-title" className="text-sm font-medium">
              {m.history}
            </h3>
            <p className="text-muted-foreground text-xs wrap-anywhere">{source.company}</p>
          </div>
          <DialogTrigger
            render={
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-fit shrink-0"
                disabled={disabled}
                aria-describedby={disabled ? 'add-position-guidance' : undefined}
              />
            }
          >
            <IconPlus data-icon="inline-start" aria-hidden="true" />
            {m.add}
          </DialogTrigger>
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          {history.isError && <FieldError>{m.historyError}</FieldError>}
          <ul className="flex min-w-0 flex-col gap-1">
            {roles.map((role) => (
              <li key={role.id} className="min-w-0">
                <Link
                  to="/dashboard/experience/$experienceId/edit"
                  params={{ experienceId: role.id }}
                  aria-current={role.id === source.id ? 'page' : undefined}
                  className={cn(
                    'hover:bg-muted focus-visible:ring-ring flex min-w-0 flex-col gap-1 rounded-md px-3 py-2.5 wrap-anywhere focus-visible:ring-2 focus-visible:outline-none sm:flex-row sm:items-center sm:justify-between sm:gap-4',
                    role.id === source.id && 'bg-muted',
                  )}
                >
                  <span className="flex min-w-0 flex-wrap items-center gap-2">
                    <span className="font-medium">{role.title}</span>
                    {role.id === source.id && <Badge variant="secondary">{m.editing}</Badge>}
                  </span>
                  <span className="text-muted-foreground shrink-0 text-xs">
                    <time dateTime={role.startDate.slice(0, 10)}>
                      {format(role.startDate, 'dd MMM yyyy', { locale })}
                    </time>
                    {' – '}
                    {role.currentlyWorking ? (
                      m.present
                    ) : role.endDate ? (
                      <time dateTime={role.endDate.slice(0, 10)}>
                        {format(role.endDate, 'dd MMM yyyy', { locale })}
                      </time>
                    ) : null}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {disabled && (
          <p id="add-position-guidance" className="text-muted-foreground text-xs">
            {m.dirty}
          </p>
        )}
        {open && (
          <NewPositionForm
            source={source}
            disabled={disabled}
            onClose={() => {
              setBusy(false)
              setOpen(false)
            }}
            onBusy={setBusy}
            onSaved={onSaved}
          />
        )}
      </section>
    </Dialog>
  )
}

function NewPositionForm({
  source,
  disabled,
  onClose,
  onSaved,
  onBusy,
}: {
  source: Experience
  disabled: boolean
  onClose: () => void
  onBusy: (busy: boolean) => void
  onSaved: (groupId: string | null) => void
}) {
  const { t } = useTranslations()
  const m = t.experiencePosition
  const queryClient = useQueryClient()
  const [stint, setStint] = useState<'same' | 'new'>('same')
  const [values, setValues] = useState({
    title: '',
    description: '',
    location: source.location,
    type: source.type,
    startDate: '',
    endDate: '',
    currentlyWorking: false,
    skills: '',
    achievements: '',
    status: 'draft' as AddExperiencePositionInput['position']['status'],
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [refreshing, setRefreshing] = useState(false)
  const mutation = useMutation(
    trpc.experience.addPosition.mutationOptions({
      onError: () => onBusy(false),
      onSuccess: async (result) => {
        setRefreshing(true)
        // Update only membership, never reset the parent's title/content/date fields.
        onSaved(result.sourceGroupId)
        await invalidatePositionQueries(queryClient, trpc, source.id)
        onClose()
      },
    }),
  )
  const pending = mutation.isPending || refreshing
  const change = <TKey extends keyof typeof values>(key: TKey, value: (typeof values)[TKey]) =>
    setValues((old) => ({ ...old, [key]: value }))
  const textField = (
    key: 'title' | 'location' | 'startDate' | 'endDate',
    label: string,
    type = 'text',
  ) => (
    <Field data-invalid={!!errors[key]}>
      <FieldLabel htmlFor={`new-position-${key}`}>{label}</FieldLabel>
      <Input
        id={`new-position-${key}`}
        type={type}
        value={values[key]}
        onChange={(e) => change(key, e.target.value)}
        aria-invalid={!!errors[key]}
        disabled={pending || (key === 'endDate' && values.currentlyWorking)}
      />
      {errors[key] && <FieldError>{errors[key]}</FieldError>}
    </Field>
  )
  return (
    <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-xl" showCloseButton={!pending}>
      <DialogHeader>
        <DialogTitle>{m.add}</DialogTitle>
        <DialogDescription>{m.context}</DialogDescription>
      </DialogHeader>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          // Portal events still bubble through React to the parent edit form.
          event.stopPropagation()
          if (pending || disabled) return
          const lines = (text: string) =>
            text
              .split('\n')
              .map((line) => line.trim())
              .filter(Boolean)
          const parsed = addExperiencePositionSchema.safeParse({
            sourceId: source.id,
            stint,
            position: {
              ...values,
              startDate: values.startDate ? `${values.startDate}T00:00:00.000Z` : '',
              endDate:
                values.endDate && !values.currentlyWorking
                  ? `${values.endDate}T00:00:00.000Z`
                  : undefined,
              skills: lines(values.skills),
              achievements: lines(values.achievements),
            },
          })
          if (!parsed.success) {
            setErrors(
              Object.fromEntries(
                parsed.error.issues.map((issue) => [
                  String(issue.path[1] ?? issue.path[0]),
                  issue.message,
                ]),
              ),
            )
            return
          }
          setErrors({})
          onBusy(true)
          mutation.mutate(parsed.data)
        }}
      >
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="new-position-company">{m.company}</FieldLabel>
            <Input id="new-position-company" value={source.company} readOnly />
          </Field>
          <Field>
            <FieldLabel id="new-position-stint">{m.employment}</FieldLabel>
            <ToggleGroup
              aria-labelledby="new-position-stint"
              variant="outline"
              value={[stint]}
              disabled={pending}
              onValueChange={(items) => {
                const next = items.find((item) => item !== stint)
                if (next === 'same' || next === 'new') setStint(next)
              }}
            >
              <ToggleGroupItem value="same">{m.same}</ToggleGroupItem>
              <ToggleGroupItem value="new">{m.newStint}</ToggleGroupItem>
            </ToggleGroup>
            <FieldDescription>{stint === 'same' ? m.sameHelp : m.newHelp}</FieldDescription>
          </Field>
          {textField('title', m.title)}
          {textField('location', m.location)}
          <Field>
            <FieldLabel htmlFor="new-position-type">{m.type}</FieldLabel>
            <Select
              value={values.type}
              disabled={pending}
              onValueChange={(value) => {
                if (EXPERIENCE_TYPES.includes(value as typeof values.type))
                  change('type', value as typeof values.type)
              }}
            >
              <SelectTrigger id="new-position-type">
                <SelectValue>{EXPERIENCE_TYPE_LABELS[values.type]}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {EXPERIENCE_TYPES.map((value) => (
                    <SelectItem key={value} value={value}>
                      {EXPERIENCE_TYPE_LABELS[value]}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          {textField('startDate', m.start, 'date')}
          {textField('endDate', m.end, 'date')}
          <Field>
            <FieldLabel htmlFor="new-position-current">{m.current}</FieldLabel>
            <Checkbox
              id="new-position-current"
              checked={values.currentlyWorking}
              disabled={pending}
              onCheckedChange={(checked) => change('currentlyWorking', checked)}
            />
          </Field>
          {(['description', 'achievements', 'skills'] as const).map((key) => (
            <Field key={key} data-invalid={!!errors[key]}>
              <FieldLabel htmlFor={`new-position-${key}`}>{m[key]}</FieldLabel>
              <Textarea
                id={`new-position-${key}`}
                value={values[key]}
                disabled={pending}
                aria-invalid={!!errors[key]}
                onChange={(e) => change(key, e.target.value)}
              />
              {errors[key] && <FieldError>{errors[key]}</FieldError>}
            </Field>
          ))}
          <Field>
            <FieldLabel id="new-position-status">{m.status}</FieldLabel>
            <ToggleGroup
              aria-labelledby="new-position-status"
              variant="outline"
              value={[values.status]}
              disabled={pending}
              onValueChange={(items) => {
                const next = items.find((item) => item !== values.status)
                if (next && EXPERIENCE_STATUS_TYPES.includes(next as typeof values.status))
                  change('status', next as typeof values.status)
              }}
            >
              {EXPERIENCE_STATUS_TYPES.map((value) => (
                <ToggleGroupItem key={value} value={value}>
                  {EXPERIENCE_STATUS_LABELS[value]}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </Field>
          {disabled && <FieldError>{m.dirty}</FieldError>}
          {mutation.isError && <FieldError role="alert">{mutation.error.message}</FieldError>}
          <DialogFooter>
            <Button type="button" variant="outline" disabled={pending} onClick={onClose}>
              {m.cancel}
            </Button>
            <Button type="submit" disabled={pending || disabled}>
              {pending ? m.saving : m.save}
            </Button>
          </DialogFooter>
        </FieldGroup>
      </form>
    </DialogContent>
  )
}
