import { TranslationEditor } from '@/components/dashboard/translation-editor'
import type { TranslationFieldDef } from '@/components/dashboard/translation-editor'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { globalErrorToast, globalSuccessToast } from '@/lib/toasts'
import { trpc } from '@/utils/trpc'
import type { AvailabilityStatus } from '@portofolio/constants'
import { AVAILABILITY_STATUS_LABELS, AVAILABILITY_STATUS_TYPES } from '@portofolio/constants'
import type { Locale } from '@portofolio/i18n'
import { updateProfileSchema } from '@portofolio/schema/profile.schema'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

const PROFILE_TRANSLATION_FIELDS: ReadonlyArray<TranslationFieldDef> = [
  { name: 'title', label: 'Title', type: 'input', placeholder: 'e.g. Full Stack Developer' },
  { name: 'bio', label: 'Bio', type: 'textarea', placeholder: 'A short bio about yourself' },
]

function ProfileTranslationsSection({
  profileId,
  sourceValues,
}: {
  profileId: string
  sourceValues: Record<string, string>
}) {
  const queryClient = useQueryClient()
  const translationsQuery = useQuery(trpc.profile.getTranslations.queryOptions({ profileId }))

  const invalidate = () =>
    queryClient.invalidateQueries(trpc.profile.getTranslations.queryFilter({ profileId }))

  const upsert = useMutation(
    trpc.profile.upsertTranslation.mutationOptions({
      onSuccess: async () => {
        await invalidate()
        globalSuccessToast('Translation saved')
      },
      onError: (error) => globalErrorToast(error.message || 'Failed to save translation'),
    }),
  )

  const remove = useMutation(
    trpc.profile.deleteTranslation.mutationOptions({
      onSuccess: async () => {
        await invalidate()
        globalSuccessToast('Translation removed')
      },
      onError: (error) => globalErrorToast(error.message || 'Failed to remove translation'),
    }),
  )

  return (
    <TranslationEditor
      fields={PROFILE_TRANSLATION_FIELDS}
      translations={translationsQuery.data ?? []}
      sourceValues={sourceValues}
      isLoading={translationsQuery.isLoading}
      savingLocale={upsert.isPending ? upsert.variables.locale : null}
      removingLocale={remove.isPending ? remove.variables.locale : null}
      onSave={(locale: Locale, values) =>
        upsert.mutate({ profileId, locale, title: values.title ?? '', bio: values.bio ?? '' })
      }
      onRemove={(locale: Locale) => remove.mutate({ profileId, locale })}
    />
  )
}

export const Route = createFileRoute('/(core)/dashboard/hero/')({
  beforeLoad: async ({ context }) => {
    await context.queryClient.ensureQueryData(context.trpc.profile.get.queryOptions())
  },
  component: RouteComponent,
})

function RouteComponent() {
  const queryClient = useQueryClient()

  const { data } = useSuspenseQuery(trpc.profile.get.queryOptions())
  const updateProfile = useMutation(
    trpc.profile.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.profile.get.queryOptions())
        globalSuccessToast('Profile updated successfully')
      },
      onError: (error) => {
        globalErrorToast(error.message || 'Failed to update profile')
      },
    }),
  )

  const form = useForm({
    validators: {
      onSubmit: updateProfileSchema,
    },
    defaultValues: {
      id: data.id,
      name: data.name,
      title: data.title,
      bio: data.bio,
      email: data.email,
      location: data.location ?? undefined,
      availabilityStatus: data.availabilityStatus,
    },
    onSubmit: async ({ value }) => {
      await updateProfile.mutateAsync(value)
    },
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-foreground text-base font-bold">Profile</h2>
        <p className="text-muted-foreground text-xs">Update your public profile information.</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="grid gap-2"
      >
        <FieldGroup className="gap-4">
          <form.Field
            name="name"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Your full name"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <form.Field
            name="title"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                  <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="e.g. Full Stack Developer"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <form.Field
            name="email"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="your@email.com"
                    type="email"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <form.Field
            name="location"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                  <FieldLabel htmlFor={field.name}>Location</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="City, State"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <form.Field
            name="availabilityStatus"
            children={(field) => (
              <Field className="flex flex-col gap-1.5">
                <FieldLabel>Availability Status</FieldLabel>
                <ToggleGroup
                  variant="outline"
                  value={[field.state.value]}
                  onValueChange={(values) => {
                    const next = values.find((v) => v !== field.state.value)
                    if (next) field.handleChange(next as AvailabilityStatus)
                  }}
                >
                  {AVAILABILITY_STATUS_TYPES.map((status) => (
                    <ToggleGroupItem key={status} value={status} aria-label={status}>
                      {AVAILABILITY_STATUS_LABELS[status]}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </Field>
            )}
          />

          <form.Field
            name="bio"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                  <FieldLabel htmlFor={field.name}>Bio</FieldLabel>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Write a short bio about yourself"
                    rows={4}
                  />
                  <p className="text-muted-foreground text-right text-xs">
                    {field.state.value.length} characters
                  </p>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <div className="flex justify-end">
            <form.Subscribe
              selector={(state) => state.isSubmitting}
              children={(isSubmitting) => (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
                  Save Changes
                </Button>
              )}
            />
          </div>
        </FieldGroup>
      </form>

      <Separator />

      <div className="flex flex-col gap-1">
        <h2 className="text-foreground text-base font-bold">Translations</h2>
        <p className="text-muted-foreground text-xs">
          Translate your title and bio. Empty fields fall back to the default content.
        </p>
      </div>
      <ProfileTranslationsSection
        profileId={data.id}
        sourceValues={{ title: data.title, bio: data.bio }}
      />
    </div>
  )
}
