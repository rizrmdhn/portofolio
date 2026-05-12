import { Button } from '@/components/ui/button'
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
import { globalErrorToast, globalSuccessToast } from '@/lib/toasts'
import { trpc } from '@/utils/trpc'
import type { SocialIconName } from '@portofolio/constants'
import { SOCIAL_ICON_MAP, SOCIAL_ICON_NAMES } from '@portofolio/constants'
import { createSocialLinkSchema } from '@portofolio/schema/social-link.schema'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/(core)/dashboard/social-links/create')({
  component: RouteComponent,
})

function RouteComponent() {
  const queryClient = useQueryClient()
  const navigate = Route.useNavigate()
  const router = useRouter()

  const createMutation = useMutation(
    trpc.socialLink.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.socialLink.getForDashboard.queryFilter())
        globalSuccessToast('Social link created!')
        navigate({ to: '/dashboard/social-links' })
      },
      onError: (err) => globalErrorToast(err.message),
    }),
  )

  const form = useForm({
    validators: { onSubmit: createSocialLinkSchema },
    defaultValues: {
      title: '',
      url: '',
      icon: 'github' as SocialIconName,
      order: 0,
    },
    onSubmit: async ({ value }) => {
      await createMutation.mutateAsync(value)
    },
  })

  return (
    <div className="flex min-h-[calc(100svh-var(--header-height)-2rem)] flex-1 flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-foreground text-base font-bold">Add Social Link</h2>
        <p className="text-muted-foreground text-xs">Add a new social link to your portfolio.</p>
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
          <ScrollArea className="min-h-0 flex-1">
            <div className="p-4">
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
                          placeholder="e.g. GitHub"
                        />
                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    )
                  }}
                />

                <form.Field
                  name="icon"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    const SelectedIcon = SOCIAL_ICON_MAP[field.state.value as SocialIconName].icon
                    return (
                      <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                        <FieldLabel>Icon</FieldLabel>
                        <Select
                          value={field.state.value}
                          onValueChange={(v) => field.handleChange(v as SocialIconName)}
                        >
                          <SelectTrigger aria-invalid={isInvalid}>
                            <SelectValue>
                              <span className="flex items-center gap-2">
                                {<SelectedIcon className="size-4 shrink-0" />}
                                {SOCIAL_ICON_MAP[field.state.value as SocialIconName].label}
                              </span>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {SOCIAL_ICON_NAMES.map((name) => {
                              const meta = SOCIAL_ICON_MAP[name]
                              const ItemIcon = meta.icon
                              return (
                                <SelectItem key={name} value={name}>
                                  <span className="flex items-center gap-2">
                                    <ItemIcon className="size-4 shrink-0" />
                                    {meta.label}
                                  </span>
                                </SelectItem>
                              )
                            })}
                          </SelectContent>
                        </Select>
                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    )
                  }}
                />

                <form.Field
                  name="url"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                        <FieldLabel htmlFor={field.name}>URL</FieldLabel>
                        <Input
                          id={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="https://github.com/username"
                        />
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
            </div>
          </ScrollArea>

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
                  Add Social Link
                </Button>
              )}
            />
          </footer>
        </form>
      </div>
    </div>
  )
}
