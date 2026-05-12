import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { globalErrorToast, globalSuccessToast } from '@/lib/toasts'
import { trpc } from '@/utils/trpc'
import { seoSettingsSchema } from '@portofolio/schema/seo.schema'
import type { SeoPage } from '@portofolio/types/seo.types'
import { SEO_PAGES, SEO_PAGE_LABELS } from '@portofolio/types/seo.types'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(core)/dashboard/seo/')({
  beforeLoad: async ({ context }) => {
    await context.queryClient.ensureQueryData(context.trpc.seo.getAll.queryOptions())
  },
  component: SeoSettingsPage,
})

function SeoSettingsPage() {
  const queryClient = useQueryClient()
  const { data: settings } = useSuspenseQuery(trpc.seo.getAll.queryOptions())

  const save = useMutation(
    trpc.seo.save.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.seo.getAll.queryFilter())
        SEO_PAGES.forEach((page) => {
          queryClient.invalidateQueries(trpc.seo.getPage.queryFilter({ page }))
        })
        globalSuccessToast('SEO settings saved')
      },
      onError: (err) => globalErrorToast(err.message),
    }),
  )

  const form = useForm({
    validators: { onSubmit: seoSettingsSchema },
    defaultValues: {
      pages: Object.fromEntries(
        SEO_PAGES.map((page) => [
          page,
          {
            title: settings.pages[page]?.title,
            description: settings.pages[page]?.description,
            ogImage: settings.pages[page]?.ogImage,
          },
        ]),
      ) as Record<
        SeoPage,
        { title: string | undefined; description: string | undefined; ogImage: string | undefined }
      >,
    },
    onSubmit: async ({ value }) => {
      await save.mutateAsync(value)
    },
  })

  return (
    <div className="flex min-h-[calc(100svh-var(--header-height)-2rem)] flex-1 flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-foreground text-base font-bold">SEO Metadata</h2>
        <p className="text-muted-foreground text-xs">
          Customize the page title, description, and OG image for each public page.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="flex flex-1 flex-col gap-4"
      >
        <Tabs defaultValue="home">
          <TabsList variant="line">
            {SEO_PAGES.map((page) => (
              <TabsTrigger key={page} value={page}>
                {SEO_PAGE_LABELS[page]}
              </TabsTrigger>
            ))}
          </TabsList>

          {SEO_PAGES.map((page) => (
            <TabsContent key={page} value={page} className="mt-4">
              <div className="flex max-w-xl flex-col gap-4">
                <form.Field
                  name={`pages.${page}.title`}
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                        <FieldLabel htmlFor={`${page}-title`}>Title</FieldLabel>
                        <Input
                          id={`${page}-title`}
                          value={field.state.value ?? ''}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value || undefined)}
                          aria-invalid={isInvalid}
                          placeholder={`Default: page-specific title`}
                          maxLength={120}
                        />
                        <FieldDescription>
                          Max 120 characters. Shown in browser tab and search results.
                        </FieldDescription>
                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    )
                  }}
                />

                <form.Field
                  name={`pages.${page}.description`}
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                        <FieldLabel htmlFor={`${page}-description`}>Description</FieldLabel>
                        <Textarea
                          id={`${page}-description`}
                          value={field.state.value ?? ''}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value || undefined)}
                          aria-invalid={isInvalid}
                          placeholder="Brief description shown in search engine results..."
                          rows={3}
                          maxLength={320}
                        />
                        <FieldDescription>
                          Max 320 characters. Shown in search engine results.
                        </FieldDescription>
                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    )
                  }}
                />

                <form.Field
                  name={`pages.${page}.ogImage`}
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid} className="flex flex-col gap-1.5">
                        <FieldLabel htmlFor={`${page}-ogImage`}>OG Image URL</FieldLabel>
                        <Input
                          id={`${page}-ogImage`}
                          value={field.state.value ?? ''}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value || undefined)}
                          aria-invalid={isInvalid}
                          placeholder="https://example.com/og-image.png"
                          type="url"
                        />
                        <FieldDescription>
                          Full URL to the image shown when this page is shared on social media
                          (1200×630 recommended).
                        </FieldDescription>
                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    )
                  }}
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <Separator />

        <footer className="flex shrink-0 items-center justify-end gap-2">
          <form.Subscribe
            selector={(state) => state.isSubmitting}
            children={(isSubmitting) => (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
                Save SEO Settings
              </Button>
            )}
          />
        </footer>
      </form>
    </div>
  )
}
