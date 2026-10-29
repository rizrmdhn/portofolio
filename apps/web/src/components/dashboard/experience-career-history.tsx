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
import { useForm } from '@tanstack/react-form'
import {
  newPositionDefaults,
  newPositionSchema,
  positionPayload,
  refreshAfterCommit,
} from '@/lib/experience-position-form'
import { globalErrorToast } from '@/lib/toasts'
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
  const mutation = useMutation(trpc.experience.addPosition.mutationOptions())
  const form = useForm({
    defaultValues: newPositionDefaults(source),
    // TanStack also runs onChange validators on submit. Sharing one error slot lets
    // linked fields (current/end date) clear each other's validation errors.
    validators: { onChange: newPositionSchema },
    onSubmit: async ({ value }) => {
      if (disabled) return
      onBusy(true)
      try {
        const result = await mutation.mutateAsync(
          addExperiencePositionSchema.parse(positionPayload(source.id, value)),
        )
        try {
          // Update only membership, never the parent's unsaved role content.
          onSaved(result.sourceGroupId)
          await refreshAfterCommit(
            () => invalidatePositionQueries(queryClient, trpc, source.id),
            () => globalErrorToast(m.historyError),
          )
        } finally {
          onClose()
        }
      } finally {
        onBusy(false)
      }
    },
  })
  const textField = (
    key: 'title' | 'location' | 'startDate' | 'endDate',
    label: string,
    pending: boolean,
    currentlyWorking: boolean,
    type = 'text',
  ) => (
    <form.Field name={key}>
      {(field) => (
        <Field data-invalid={!field.state.meta.isValid}>
          <FieldLabel htmlFor={`new-position-${key}`}>{label}</FieldLabel>
          <Input
            id={`new-position-${key}`}
            name={field.name}
            type={type}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            aria-invalid={!field.state.meta.isValid}
            disabled={pending || (key === 'endDate' && currentlyWorking)}
          />
          <FieldError errors={field.state.meta.errors} />
        </Field>
      )}
    </form.Field>
  )
  return (
    <form.Subscribe
      selector={(state) =>
        [state.isSubmitting, state.canSubmit, state.values.currentlyWorking] as const
      }
    >
      {([pending, canSubmit, currentlyWorking]) => (
        <DialogContent
          className="max-h-[90svh] overflow-y-auto sm:max-w-xl"
          showCloseButton={!pending}
        >
          <DialogHeader>
            <DialogTitle>{m.add}</DialogTitle>
            <DialogDescription>{m.context}</DialogDescription>
          </DialogHeader>
          <form
            onSubmit={async (event) => {
              event.preventDefault()
              // Portal events still bubble through React to the parent edit form.
              event.stopPropagation()
              if (form.state.isSubmitting || disabled) return
              try {
                await form.handleSubmit()
              } catch {
                // Mutation errors remain visible; keep TanStack's failed-submit state.
              }
            }}
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="new-position-company">{m.company}</FieldLabel>
                <Input id="new-position-company" value={source.company} readOnly />
              </Field>
              <form.Field name="stint">
                {(field) => (
                  <Field data-invalid={!field.state.meta.isValid}>
                    <FieldLabel id="new-position-stint">{m.employment}</FieldLabel>
                    <ToggleGroup
                      aria-labelledby="new-position-stint"
                      aria-invalid={!field.state.meta.isValid}
                      variant="outline"
                      value={[field.state.value]}
                      disabled={pending}
                      onBlur={field.handleBlur}
                      onValueChange={(items) => {
                        const next = items.find((item) => item !== field.state.value)
                        if (next === 'same' || next === 'new') field.handleChange(next)
                      }}
                    >
                      <ToggleGroupItem value="same">{m.same}</ToggleGroupItem>
                      <ToggleGroupItem value="new">{m.newStint}</ToggleGroupItem>
                    </ToggleGroup>
                    <FieldDescription>
                      {field.state.value === 'same' ? m.sameHelp : m.newHelp}
                    </FieldDescription>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>
              {textField('title', m.title, pending, currentlyWorking)}
              {textField('location', m.location, pending, currentlyWorking)}
              <form.Field name="type">
                {(field) => (
                  <Field data-invalid={!field.state.meta.isValid}>
                    <FieldLabel htmlFor="new-position-type">{m.type}</FieldLabel>
                    <Select
                      value={field.state.value}
                      disabled={pending}
                      onValueChange={(value) => {
                        if (EXPERIENCE_TYPES.includes(value as typeof field.state.value))
                          field.handleChange(value as typeof field.state.value)
                      }}
                    >
                      <SelectTrigger
                        id="new-position-type"
                        onBlur={field.handleBlur}
                        aria-invalid={!field.state.meta.isValid}
                      >
                        <SelectValue>{EXPERIENCE_TYPE_LABELS[field.state.value]}</SelectValue>
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
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>
              {textField('startDate', m.start, pending, currentlyWorking, 'date')}
              {textField('endDate', m.end, pending, currentlyWorking, 'date')}
              <form.Field name="currentlyWorking">
                {(field) => (
                  <Field data-invalid={!field.state.meta.isValid}>
                    <FieldLabel htmlFor="new-position-current">{m.current}</FieldLabel>
                    <Checkbox
                      id="new-position-current"
                      checked={field.state.value}
                      disabled={pending}
                      onCheckedChange={field.handleChange}
                      onBlur={field.handleBlur}
                      aria-invalid={!field.state.meta.isValid}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>
              {(['description', 'achievements', 'skills'] as const).map((key) => (
                <form.Field key={key} name={key}>
                  {(field) => (
                    <Field data-invalid={!field.state.meta.isValid}>
                      <FieldLabel htmlFor={`new-position-${key}`}>{m[key]}</FieldLabel>
                      <Textarea
                        id={`new-position-${key}`}
                        name={field.name}
                        value={field.state.value}
                        disabled={pending}
                        aria-invalid={!field.state.meta.isValid}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                </form.Field>
              ))}
              <form.Field name="status">
                {(field) => (
                  <Field data-invalid={!field.state.meta.isValid}>
                    <FieldLabel id="new-position-status">{m.status}</FieldLabel>
                    <ToggleGroup
                      aria-labelledby="new-position-status"
                      aria-invalid={!field.state.meta.isValid}
                      variant="outline"
                      value={[field.state.value]}
                      disabled={pending}
                      onBlur={field.handleBlur}
                      onValueChange={(items) => {
                        const next = items.find((item) => item !== field.state.value)
                        if (
                          next &&
                          EXPERIENCE_STATUS_TYPES.includes(next as typeof field.state.value)
                        )
                          field.handleChange(next as typeof field.state.value)
                      }}
                    >
                      {EXPERIENCE_STATUS_TYPES.map((value) => (
                        <ToggleGroupItem key={value} value={value}>
                          {EXPERIENCE_STATUS_LABELS[value]}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>
              {disabled && <FieldError>{m.dirty}</FieldError>}
              {mutation.isError && <FieldError role="alert">{mutation.error.message}</FieldError>}
              <DialogFooter>
                <Button type="button" variant="outline" disabled={pending} onClick={onClose}>
                  {m.cancel}
                </Button>
                <Button type="submit" disabled={pending || !canSubmit || disabled}>
                  {pending ? m.saving : m.save}
                </Button>
              </DialogFooter>
            </FieldGroup>
          </form>
        </DialogContent>
      )}
    </form.Subscribe>
  )
}
