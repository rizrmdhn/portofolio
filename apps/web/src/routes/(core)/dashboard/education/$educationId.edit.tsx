import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { hasTabError } from '@/lib/has-tab-error'
import { globalErrorToast, globalSuccessToast } from '@/lib/toasts'
import { trpc } from '@/utils/trpc'
import type { ExperienceStatusType } from '@portofolio/constants'
import {
  DEGREE_TYPES,
  DEGREE_TYPE_LABELS,
  EXPERIENCE_STATUS_LABELS,
  EXPERIENCE_STATUS_TYPES,
} from '@portofolio/constants'
import { updateEducationSchema } from '@portofolio/schema/education.schema'
import type { TablerIcon } from '@tabler/icons-react'
import { IconSchool, IconSettings } from '@tabler/icons-react'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/(core)/dashboard/education/$educationId/edit')({
  beforeLoad: async ({ params, context }) => {
    await context.queryClient.ensureQueryData(
      context.trpc.education.getById.queryOptions({ id: params.educationId }),
    )
  },
  component: RouteComponent,
})

const TAB_TRIGGERS: Array<{ icon: TablerIcon; title: string; value: string }> = [
  { icon: IconSchool, title: 'Education Details', value: 'details' },
  { icon: IconSettings, title: 'Settings', value: 'settings' },
]

const TAB_FIELDS: Record<string, Array<string>> = {
  details: ['institution', 'degreeLevel', 'major', 'gpa', 'startYear', 'endYear'],
  settings: ['status', 'order'],
}

function RouteComponent() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { educationId } = Route.useParams()

  const { data: record } = useSuspenseQuery(
    trpc.education.getById.queryOptions({ id: educationId }),
  )

  const updateMutation = useMutation(
    trpc.education.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.education.getForDashboard.queryFilter())
        globalSuccessToast('Education updated successfully!')
        router.history.back()
      },
      onError: (err) => globalErrorToast(err.message),
    }),
  )

  const form = useForm({
    validators: { onSubmit: updateEducationSchema },
    defaultValues: {
      id: record.id,
      institution: record.institution,
      degreeLevel: record.degreeLevel,
      major: record.major,
      gpa: record.gpa ?? undefined,
      startYear: record.startYear,
      endYear: record.endYear ?? undefined,
      status: record.status,
      order: record.order,
    },
    onSubmit: async ({ value }) => {
      await updateMutation.mutateAsync(value)
    },
  })

  return (
    <div className="flex min-h-[calc(100svh-var(--header-height)-2rem)] flex-1 flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-foreground text-base font-bold">Edit Education</h2>
        <p className="text-muted-foreground text-xs">Update your education details.</p>
      </div>

      <div className="flex flex-1">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="flex w-full flex-1 flex-col overflow-hidden"
        >
          <Tabs defaultValue="details" className="min-h-0 flex-1 gap-0">
            <div className="shrink-0 px-4 pt-4 pb-2">
              <form.Subscribe
                selector={(state) => state.fieldMeta}
                children={(fieldMeta) => (
                  <TabsList variant="line">
                    {TAB_TRIGGERS.map((tab) => {
                      const hasError = hasTabError(
                        fieldMeta as Record<string, { errors: Array<unknown> }>,
                        TAB_FIELDS[tab.value] ?? [],
                      )
                      return (
                        <TabsTrigger key={tab.value} value={tab.value}>
                          <tab.icon />
                          {tab.title}
                          {hasError && <span className="bg-destructive size-1.5 rounded-full" />}
                        </TabsTrigger>
                      )
                    })}
                  </TabsList>
                )}
              />
            </div>

            <ScrollArea className="min-h-0 flex-1">
              <div className="p-4">
                <TabsContent value="details">
                  <FieldGroup className="gap-4">
                    <form.Field
                      name="institution"
                      children={(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                            <FieldLabel htmlFor={field.name}>Institution</FieldLabel>
                            <Input
                              id={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) => field.handleChange(e.target.value)}
                              aria-invalid={isInvalid}
                              placeholder="e.g. University of Indonesia"
                            />
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                          </Field>
                        )
                      }}
                    />

                    <form.Field
                      name="degreeLevel"
                      children={(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                            <FieldLabel>Degree Level</FieldLabel>
                            <Select
                              value={field.state.value}
                              onValueChange={(v) =>
                                field.handleChange(v as (typeof DEGREE_TYPES)[number])
                              }
                            >
                              <SelectTrigger aria-invalid={isInvalid}>
                                <SelectValue placeholder="Select degree level">
                                  {DEGREE_TYPE_LABELS[field.state.value]}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                {DEGREE_TYPES.map((d) => (
                                  <SelectItem key={d} value={d}>
                                    {DEGREE_TYPE_LABELS[d]}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                          </Field>
                        )
                      }}
                    />

                    <form.Field
                      name="major"
                      children={(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                            <FieldLabel htmlFor={field.name}>Major / Field of Study</FieldLabel>
                            <Input
                              id={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) => field.handleChange(e.target.value)}
                              aria-invalid={isInvalid}
                              placeholder="e.g. Computer Science"
                            />
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                          </Field>
                        )
                      }}
                    />

                    <form.Field
                      name="gpa"
                      children={(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                            <FieldLabel htmlFor={field.name}>GPA (optional)</FieldLabel>
                            <Input
                              id={field.name}
                              value={field.state.value ?? ''}
                              onBlur={field.handleBlur}
                              onChange={(e) => field.handleChange(e.target.value || undefined)}
                              aria-invalid={isInvalid}
                              placeholder="e.g. 3.75"
                            />
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                          </Field>
                        )
                      }}
                    />

                    <div className="grid gap-4 md:grid-cols-2">
                      <form.Field
                        name="startYear"
                        children={(field) => {
                          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                          return (
                            <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                              <FieldLabel>Start Year</FieldLabel>
                              <DatePicker
                                value={field.state.value ? new Date(field.state.value) : undefined}
                                onChange={(value) =>
                                  field.handleChange(new Date(value).toISOString())
                                }
                                placeholder="Select start year"
                              />
                              {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                          )
                        }}
                      />

                      <form.Field
                        name="endYear"
                        children={(field) => {
                          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                          return (
                            <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                              <FieldLabel>End Year (optional)</FieldLabel>
                              <DatePicker
                                value={field.state.value ? new Date(field.state.value) : undefined}
                                onChange={(value) =>
                                  field.handleChange(new Date(value).toISOString())
                                }
                                placeholder="Leave empty if ongoing"
                              />
                              {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                          )
                        }}
                      />
                    </div>
                  </FieldGroup>
                </TabsContent>

                <TabsContent value="settings">
                  <FieldGroup className="gap-4">
                    <form.Field
                      name="status"
                      children={(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                            <FieldLabel>Status</FieldLabel>
                            <ToggleGroup
                              variant="outline"
                              value={[field.state.value]}
                              onValueChange={(values) => {
                                const next = values.find((v) => v !== field.state.value)
                                if (next) field.handleChange(next as ExperienceStatusType)
                              }}
                            >
                              {EXPERIENCE_STATUS_TYPES.map((status) => (
                                <ToggleGroupItem key={status} value={status} aria-label={status}>
                                  {EXPERIENCE_STATUS_LABELS[status]}
                                </ToggleGroupItem>
                              ))}
                            </ToggleGroup>
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                          </Field>
                        )
                      }}
                    />

                    <form.Field
                      name="order"
                      children={(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                            <FieldLabel htmlFor={field.name}>Order</FieldLabel>
                            <Input
                              id={field.name}
                              type="number"
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) => field.handleChange(Number(e.target.value))}
                            />
                            <FieldDescription>Lower = earlier</FieldDescription>
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                          </Field>
                        )
                      }}
                    />
                  </FieldGroup>
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>

          <Separator />

          <footer className="flex shrink-0 items-center justify-end gap-2 p-4">
            <Button type="button" variant="outline" onClick={() => router.history.back()}>
              Cancel
            </Button>
            <form.Subscribe
              selector={(state) => state.isSubmitting}
              children={(isSubmitting) => (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
                  Save Changes
                </Button>
              )}
            />
          </footer>
        </form>
      </div>
    </div>
  )
}
