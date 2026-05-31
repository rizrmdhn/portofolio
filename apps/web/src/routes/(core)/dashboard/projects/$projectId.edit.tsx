import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import InputTag from '@/components/ui/input-tag'
import ProjectImagesManager from '@/components/ui/project-images-manager'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { hasTabError } from '@/lib/has-tab-error'
import { globalErrorToast, globalSuccessToast } from '@/lib/toasts'
import { cn } from '@/lib/utils'
import { toFormData } from '@/utils/form-data-mapper'
import { trpc } from '@/utils/trpc'
import { COLOR_VALUES } from '@portofolio/constants'
import { updateProjectSchema } from '@portofolio/schema/project.schema'
import type { TablerIcon } from '@tabler/icons-react'
import { IconLink, IconPencil, IconSettings, IconUpload } from '@tabler/icons-react'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/(core)/dashboard/projects/$projectId/edit')({
  beforeLoad: async ({ params, context }) => {
    await context.queryClient.ensureQueryData(
      context.trpc.project.getById.queryOptions({ id: params.projectId }),
    )
  },
  component: RouteComponent,
})

const TAB_TRIGGERS: Array<{ icon: TablerIcon; title: string; value: string }> = [
  { icon: IconPencil, title: 'Content', value: 'content' },
  { icon: IconLink, title: 'Links', value: 'links' },
  { icon: IconUpload, title: 'Media', value: 'media' },
  { icon: IconSettings, title: 'Settings', value: 'settings' },
]

const TAB_FIELDS: Record<string, Array<string>> = {
  content: ['title', 'description', 'longDescription', 'tech'],
  links: ['githubUrl', 'liveUrl', 'playstoreUrl', 'appstoreUrl'],
  media: ['coverColor'],
  settings: ['status', 'isVisible', 'featured', 'order'],
}

function RouteComponent() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { projectId } = Route.useParams()
  const { data: project } = useSuspenseQuery(trpc.project.getById.queryOptions({ id: projectId }))

  const editProjectMutation = useMutation(
    trpc.project.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.project.getPaginatedProjects.queryFilter())
        await queryClient.invalidateQueries(trpc.project.getById.queryOptions({ id: projectId }))
        globalSuccessToast('Project updated successfully')
      },
      onError: (error) => {
        globalErrorToast(error.message || 'Failed to update project')
      },
    }),
  )

  const form = useForm({
    validators: { onSubmit: updateProjectSchema },
    defaultValues: {
      id: project.id,
      title: project.title,
      description: project.description,
      longDescription: project.longDescription ?? undefined,
      tech: project.tech,
      githubUrl: project.githubUrl ?? undefined,
      liveUrl: project.liveUrl ?? undefined,
      playstoreUrl: project.playstoreUrl ?? undefined,
      appstoreUrl: project.appstoreUrl ?? undefined,
      coverColor: project.coverColor,
      status: project.status,
      isVisible: project.isVisible,
      order: project.order,
      featured: project.featureAt !== null,
    },
    onSubmit: async ({ value }) => {
      const formData = toFormData(value)

      await editProjectMutation.mutateAsync(formData)
    },
  })

  return (
    <div className="flex min-h-[calc(100svh-var(--header-height)-2rem)] flex-1 flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-foreground text-base font-bold">Edit project</h2>
        <p className="text-muted-foreground text-xs">Update your portfolio project</p>
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
          <Tabs defaultValue="content" className="min-h-0 flex-1 gap-0">
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
              <div className="px-4 pb-4">
                {/* Content */}
                <TabsContent value="content">
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
                              placeholder="My awesome project"
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
                            <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                            <Textarea
                              id={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) => field.handleChange(e.target.value)}
                              placeholder="Short description of your project"
                              rows={3}
                            />
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                          </Field>
                        )
                      }}
                    />

                    <form.Field
                      name="longDescription"
                      children={(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                            <FieldLabel htmlFor={field.name}>Long Description</FieldLabel>
                            <Textarea
                              id={field.name}
                              value={field.state.value ?? ''}
                              onBlur={field.handleBlur}
                              onChange={(e) => field.handleChange(e.target.value)}
                              placeholder="Detailed description of your project"
                              rows={6}
                            />
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                          </Field>
                        )
                      }}
                    />

                    <form.Field
                      name="tech"
                      children={(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                            <FieldLabel>Technologies</FieldLabel>
                            <InputTag
                              value={field.state.value}
                              onChange={field.handleChange}
                              onBlur={field.handleBlur}
                              placeholder="Add a technology..."
                              error={isInvalid ? String(field.state.meta.errors[0]) : undefined}
                            />
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                          </Field>
                        )
                      }}
                    />
                  </FieldGroup>
                </TabsContent>

                {/* Links */}
                <TabsContent value="links">
                  <FieldGroup className="gap-4">
                    <FieldDescription>
                      External links shown on project card. Leave blank to hide.
                    </FieldDescription>
                    <form.Field
                      name="githubUrl"
                      children={(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                            <FieldLabel htmlFor={field.name}>GitHub URL</FieldLabel>
                            <Input
                              id={field.name}
                              value={field.state.value ?? ''}
                              onBlur={field.handleBlur}
                              onChange={(e) => field.handleChange(e.target.value || undefined)}
                              placeholder="https://github.com/..."
                              type="url"
                            />
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                          </Field>
                        )
                      }}
                    />

                    <form.Field
                      name="liveUrl"
                      children={(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                            <FieldLabel htmlFor={field.name}>Live URL</FieldLabel>
                            <Input
                              id={field.name}
                              value={field.state.value ?? ''}
                              onBlur={field.handleBlur}
                              onChange={(e) => field.handleChange(e.target.value || undefined)}
                              placeholder="https://..."
                              type="url"
                            />
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                          </Field>
                        )
                      }}
                    />

                    <form.Field
                      name="playstoreUrl"
                      children={(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                            <FieldLabel htmlFor={field.name}>Play Store URL</FieldLabel>
                            <Input
                              id={field.name}
                              value={field.state.value ?? ''}
                              onBlur={field.handleBlur}
                              onChange={(e) => field.handleChange(e.target.value || undefined)}
                              placeholder="https://play.google.com/..."
                              type="url"
                            />
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                          </Field>
                        )
                      }}
                    />

                    <form.Field
                      name="appstoreUrl"
                      children={(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                            <FieldLabel htmlFor={field.name}>App Store URL</FieldLabel>
                            <Input
                              id={field.name}
                              value={field.state.value ?? ''}
                              onBlur={field.handleBlur}
                              onChange={(e) => field.handleChange(e.target.value || undefined)}
                              placeholder="https://apps.apple.com/..."
                              type="url"
                            />
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                          </Field>
                        )
                      }}
                    />
                  </FieldGroup>
                </TabsContent>

                {/* Media */}
                <TabsContent value="media">
                  <FieldGroup className="gap-4">
                    <Field className="flex flex-col gap-2">
                      <FieldLabel>Images</FieldLabel>
                      <FieldDescription>
                        Add multiple images. The first image becomes the cover; drag to reorder and
                        use “Set as Cover” to change it. Recommended size: 1200x630px. Max 5MB each.
                      </FieldDescription>
                      <ProjectImagesManager projectId={projectId} />
                    </Field>

                    <form.Field
                      name="coverColor"
                      children={(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid} className="flex flex-col gap-2">
                            <FieldLabel>Cover Color</FieldLabel>
                            <FieldDescription>Fallback when image unavailable</FieldDescription>
                            <div className="flex flex-wrap gap-2">
                              {COLOR_VALUES.map((color) => (
                                <button
                                  key={color}
                                  type="button"
                                  onClick={() => field.handleChange(color)}
                                  className={cn(
                                    'size-7 rounded-md border-2 transition-transform hover:scale-110',
                                    field.state.value === color
                                      ? 'border-foreground scale-110'
                                      : 'border-transparent',
                                  )}
                                  style={{ backgroundColor: color }}
                                  title={color}
                                />
                              ))}
                            </div>
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                          </Field>
                        )
                      }}
                    />
                  </FieldGroup>
                </TabsContent>

                {/* Settings */}
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
                                if (next) field.handleChange(next as typeof field.state.value)
                              }}
                            >
                              <ToggleGroupItem value="draft">Draft</ToggleGroupItem>
                              <ToggleGroupItem value="published">Published</ToggleGroupItem>
                            </ToggleGroup>
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                          </Field>
                        )
                      }}
                    />

                    <form.Field
                      name="isVisible"
                      children={(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field
                            data-invalid={isInvalid}
                            className="flex items-center justify-between"
                          >
                            <div className="flex flex-col gap-0.5">
                              <FieldLabel>Visibility</FieldLabel>
                            </div>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={field.state.value}
                                onCheckedChange={field.handleChange}
                              />
                              <p className="text-foreground text-sm">Visible in public portfolio</p>
                            </div>
                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                          </Field>
                        )
                      }}
                    />

                    <form.Field
                      name="featured"
                      children={(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field
                            data-invalid={isInvalid}
                            className="flex items-center justify-between"
                          >
                            <div className="flex flex-col gap-0.5">
                              <FieldLabel>Feature on homepage</FieldLabel>
                            </div>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={field.state.value}
                                onCheckedChange={field.handleChange}
                              />
                              <p className="text-foreground text-sm">
                                Show in featured section on homepage
                              </p>
                            </div>
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

          <footer className="flex shrink-0 items-center justify-end gap-2 px-4 py-4">
            <Button variant="outline" onClick={() => router.history.back()}>
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
