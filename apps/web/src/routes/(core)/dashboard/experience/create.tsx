import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import InputTag from '@/components/ui/input-tag'
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
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { hasTabError } from '@/lib/has-tab-error'
import { globalErrorToast, globalSuccessToast } from '@/lib/toasts'
import { trpc } from '@/utils/trpc'
import type { ExperienceStatusType, ExperienceType } from '@portofolio/constants'
import {
  EXPERIENCE_STATUS_LABELS,
  EXPERIENCE_STATUS_TYPES,
  EXPERIENCE_TYPES,
  EXPERIENCE_TYPE_LABELS,
} from '@portofolio/constants'
import { createExperienceSchema } from '@portofolio/schema/experience.schema'
import type { TablerIcon } from '@tabler/icons-react'
import { IconBriefcase, IconSettings } from '@tabler/icons-react'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/(core)/dashboard/experience/create')({
  component: RouteComponent,
})

const TAB_TRIGGERS: Array<{ icon: TablerIcon; title: string; value: string }> = [
  { icon: IconBriefcase, title: 'Role Details', value: 'role-details' },
  { icon: IconSettings, title: 'Settings', value: 'settings' },
]

const TAB_FIELDS: Record<string, Array<string>> = {
  'role-details': [
    'title',
    'description',
    'company',
    'location',
    'type',
    'startDate',
    'endDate',
    'currentlyWorking',
    'skills',
  ],
  settings: ['status', 'order'],
}

function RouteComponent() {
  const queryClient = useQueryClient()
  const navigate = Route.useNavigate()
  const router = useRouter()

  const createExperienceMutation = useMutation(
    trpc.experience.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.experience.getForDashboard.queryFilter())

        globalSuccessToast('Experience created successfully!')
        navigate({
          to: '/dashboard/experience',
        })
      },
      onError: (data) => {
        globalErrorToast(data.message)
      },
    }),
  )

  const form = useForm({
    validators: { onSubmit: createExperienceSchema },
    defaultValues: {
      title: '',
      description: '',
      company: '',
      location: '',
      type: 'contract' as ExperienceType,
      startDate: new Date().toISOString(),
      endDate: undefined as string | undefined,
      currentlyWorking: false,
      skills: [] as Array<string>,
      status: 'draft' as ExperienceStatusType,
      order: 0,
    },
    onSubmit: async ({ value }) => {
      await createExperienceMutation.mutateAsync(value)
    },
  })

  return (
    <div className="flex min-h-[calc(100svh-var(--header-height)-2rem)] flex-1 flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-foreground text-base font-bold">Create a new experience</h2>
        <p className="text-muted-foreground text-xs">
          Create a new experience entry for your portfolio. Fill in the details and settings to
          showcase your work history and skills effectively.
        </p>
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
          <Tabs defaultValue="role-details" className="min-h-0 flex-1 gap-0">
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
                {/* Role Details Content */}
                <TabsContent value="role-details">
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
                              placeholder="e.g. Software Engineer"
                            />
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                          </Field>
                        )
                      }}
                    />

                    <form.Field
                      name="company"
                      children={(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                            <FieldLabel htmlFor={field.name}>Company</FieldLabel>
                            <Input
                              id={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) => field.handleChange(e.target.value)}
                              aria-invalid={isInvalid}
                              placeholder="e.g. Google"
                            />
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                          </Field>
                        )
                      }}
                    />

                    <div className="grid gap-4 md:grid-cols-2">
                      <form.Field
                        name="location"
                        children={(field) => {
                          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                          return (
                            <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                              <FieldLabel htmlFor={field.name}>Location</FieldLabel>
                              <Input
                                id={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                aria-invalid={isInvalid}
                                placeholder="e.g. Remote, Jakarta, etc."
                              />
                              {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                          )
                        }}
                      />

                      <form.Field
                        name="type"
                        children={(field) => {
                          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                          return (
                            <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                              <FieldLabel htmlFor="employment-type">Employment Type</FieldLabel>
                              <Select
                                name={field.name}
                                value={field.state.value}
                                onValueChange={(value) =>
                                  field.handleChange(value as ExperienceType)
                                }
                              >
                                <SelectTrigger id="employment-type" aria-invalid={isInvalid}>
                                  <SelectValue placeholder="Select">
                                    {EXPERIENCE_TYPE_LABELS[field.state.value]}
                                  </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                  {EXPERIENCE_TYPES.map((type) => (
                                    <SelectItem key={type} value={type}>
                                      {EXPERIENCE_TYPE_LABELS[type]}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                          )
                        }}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <form.Field
                        name="startDate"
                        children={(field) => {
                          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                          return (
                            <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                              <FieldLabel>Start Date</FieldLabel>
                              <DatePicker
                                value={field.state.value ? new Date(field.state.value) : undefined}
                                onChange={(value) =>
                                  field.handleChange(new Date(value).toISOString())
                                }
                                placeholder="Select start date"
                              />
                              {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                          )
                        }}
                      />

                      <form.Field
                        name="endDate"
                        children={(field) => {
                          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                          return (
                            <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                              <FieldLabel>End Date</FieldLabel>
                              <DatePicker
                                value={field.state.value ? new Date(field.state.value) : undefined}
                                onChange={(value) =>
                                  field.handleChange(new Date(value).toISOString())
                                }
                                placeholder="Select end date"
                              />
                              {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                          )
                        }}
                      />

                      <form.Field
                        name="currentlyWorking"
                        children={(field) => {
                          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                          return (
                            <Field
                              data-invalid={isInvalid}
                              className="flex items-center justify-between"
                            >
                              <div className="flex flex-col gap-0.5">
                                <FieldLabel>Currently Working Here</FieldLabel>
                              </div>
                              <div className="flex items-center gap-2">
                                <Switch
                                  checked={field.state.value}
                                  onCheckedChange={field.handleChange}
                                />
                                <p className="text-foreground text-sm">
                                  {field.state.value ? 'Yes' : 'No'}
                                </p>
                              </div>
                              {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                          )
                        }}
                      />
                    </div>

                    <form.Field
                      name="description"
                      children={(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                            <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                            <Textarea
                              id={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) => field.handleChange(e.target.value)}
                              placeholder="Description of your role and responsibilities"
                              rows={3}
                            />
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                          </Field>
                        )
                      }}
                    />

                    <form.Field
                      name="skills"
                      children={(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                            <FieldLabel>Skills</FieldLabel>
                            <InputTag
                              value={field.state.value}
                              onChange={field.handleChange}
                              onBlur={field.handleBlur}
                              placeholder="Add a skill..."
                              error={isInvalid ? String(field.state.meta.errors[0]) : undefined}
                            />
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                          </Field>
                        )
                      }}
                    />
                  </FieldGroup>
                </TabsContent>

                {/* Settings Content */}
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
            <Button
              variant="outline"
              onClick={() => {
                router.history.back()
              }}
            >
              Cancel
            </Button>
            <form.Subscribe
              selector={(state) => state.isSubmitting}
              children={(isSubmitting) => (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
                  Create Experience
                </Button>
              )}
            />
          </footer>
        </form>
      </div>
    </div>
  )
}
