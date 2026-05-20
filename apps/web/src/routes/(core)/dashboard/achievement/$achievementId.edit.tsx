import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { hasTabError } from '@/lib/has-tab-error'
import { globalErrorToast, globalSuccessToast } from '@/lib/toasts'
import { trpc } from '@/utils/trpc'
import type { ExperienceStatusType } from '@portofolio/constants'
import { EXPERIENCE_STATUS_LABELS, EXPERIENCE_STATUS_TYPES } from '@portofolio/constants'
import { updateAchievementSchema } from '@portofolio/schema/achievement.schema'
import type { TablerIcon } from '@tabler/icons-react'
import { IconSettings, IconTrophy } from '@tabler/icons-react'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/(core)/dashboard/achievement/$achievementId/edit')({
  beforeLoad: async ({ params, context }) => {
    await context.queryClient.ensureQueryData(
      context.trpc.achievement.getById.queryOptions({ id: params.achievementId }),
    )
  },
  component: RouteComponent,
})

const TAB_TRIGGERS: Array<{ icon: TablerIcon; title: string; value: string }> = [
  { icon: IconTrophy, title: 'Achievement Details', value: 'details' },
  { icon: IconSettings, title: 'Settings', value: 'settings' },
]

const TAB_FIELDS: Record<string, Array<string>> = {
  details: ['title', 'issuer', 'description', 'date'],
  settings: ['status', 'order'],
}

function RouteComponent() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { achievementId } = Route.useParams()

  const { data: record } = useSuspenseQuery(
    trpc.achievement.getById.queryOptions({ id: achievementId }),
  )

  const updateMutation = useMutation(
    trpc.achievement.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.achievement.getForDashboard.queryFilter())
        globalSuccessToast('Achievement updated successfully!')
        router.history.back()
      },
      onError: (err) => globalErrorToast(err.message),
    }),
  )

  const form = useForm({
    validators: { onSubmit: updateAchievementSchema },
    defaultValues: {
      id: record.id,
      title: record.title,
      issuer: record.issuer,
      description: record.description ?? undefined,
      date: new Date(record.date).toISOString(),
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
        <h2 className="text-foreground text-base font-bold">Edit Achievement</h2>
        <p className="text-muted-foreground text-xs">Update your achievement details.</p>
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
                      name="title"
                      children={(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                            <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                            <Input
                              id={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) => field.handleChange(e.target.value)}
                              aria-invalid={isInvalid}
                              placeholder="e.g. 1st Place — National Hackathon"
                            />
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                          </Field>
                        )
                      }}
                    />

                    <form.Field
                      name="issuer"
                      children={(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                            <FieldLabel htmlFor={field.name}>Issuer / Organizer</FieldLabel>
                            <Input
                              id={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) => field.handleChange(e.target.value)}
                              aria-invalid={isInvalid}
                              placeholder="e.g. Ministry of Education"
                            />
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                          </Field>
                        )
                      }}
                    />

                    <form.Field
                      name="date"
                      children={(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                            <FieldLabel>Date</FieldLabel>
                            <DatePicker
                              value={field.state.value ? new Date(field.state.value) : undefined}
                              onChange={(value) =>
                                field.handleChange(new Date(value).toISOString())
                              }
                              placeholder="Select date"
                            />
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                          </Field>
                        )
                      }}
                    />

                    <form.Field
                      name="description"
                      children={(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                            <FieldLabel htmlFor={field.name}>Description (optional)</FieldLabel>
                            <Textarea
                              id={field.name}
                              value={field.state.value ?? ''}
                              onBlur={field.handleBlur}
                              onChange={(e) => field.handleChange(e.target.value || undefined)}
                              aria-invalid={isInvalid}
                              placeholder="Brief description of the achievement..."
                              rows={3}
                            />
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                          </Field>
                        )
                      }}
                    />
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
