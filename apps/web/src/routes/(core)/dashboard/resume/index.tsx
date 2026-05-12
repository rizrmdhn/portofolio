import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { globalErrorToast, globalSuccessToast } from '@/lib/toasts'
import { trpc } from '@/utils/trpc'
import { resumeSettingsSchema } from '@portofolio/schema/resume.schema'
import type { ResumeFont, ResumeTemplate } from '@portofolio/types/resume.types'
import { RESUME_FONTS, RESUME_FONT_LABELS, RESUME_TEMPLATES } from '@portofolio/types/resume.types'
import { IconEye, IconFileText, IconRefresh } from '@tabler/icons-react'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

const TEMPLATE_LABELS: Record<ResumeTemplate, string> = {
  ats: 'ATS (Plain, Single Column)',
  creative: 'Creative (Two Column)',
}

export const Route = createFileRoute('/(core)/dashboard/resume/')({
  beforeLoad: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(context.trpc.resume.getSettings.queryOptions()),
      context.queryClient.ensureQueryData(context.trpc.resume.get.queryOptions()),
      context.queryClient.ensureQueryData(context.trpc.resume.getStats.queryOptions()),
      context.queryClient.ensureQueryData(context.trpc.project.getAll.queryOptions()),
      context.queryClient.ensureQueryData(context.trpc.certification.getAll.queryOptions()),
    ])
  },
  component: ResumeSettingsPage,
})

function ResumeSettingsPage() {
  const queryClient = useQueryClient()
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null)

  const { data: settings } = useSuspenseQuery(trpc.resume.getSettings.queryOptions())
  const { data: cv } = useSuspenseQuery(trpc.resume.get.queryOptions())
  const { data: stats } = useSuspenseQuery(trpc.resume.getStats.queryOptions())
  const { data: allProjects } = useSuspenseQuery(trpc.project.getAll.queryOptions())
  const { data: allCertifications } = useSuspenseQuery(trpc.certification.getAll.queryOptions())

  const saveSettings = useMutation(
    trpc.resume.saveSettings.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.resume.getSettings.queryOptions())
        globalSuccessToast('Settings saved')
      },
      onError: (err) => globalErrorToast(err.message),
    }),
  )

  const generate = useMutation(
    trpc.resume.generate.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.resume.get.queryOptions())
        globalSuccessToast('Resume generated and uploaded successfully!')
      },
      onError: (err) => globalErrorToast(`Generation failed: ${err.message}`),
    }),
  )

  const toggleFeatured = useMutation(
    trpc.resume.toggleProjectFeatured.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.project.getAll.queryOptions())
      },
      onError: (err) => globalErrorToast(err.message),
    }),
  )

  const toggleCertFeatured = useMutation(
    trpc.resume.toggleCertificationFeatured.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.certification.getAll.queryOptions())
      },
      onError: (err) => globalErrorToast(err.message),
    }),
  )

  const preview = useMutation(
    trpc.resume.preview.mutationOptions({
      onSuccess: (data) => {
        setPreviewDataUrl(`data:application/pdf;base64,${data.base64}`)
      },
      onError: (err) => globalErrorToast(`Preview failed: ${err.message}`),
    }),
  )

  const form = useForm({
    validators: { onSubmit: resumeSettingsSchema },
    defaultValues: {
      template: settings.template,
      accentColor: settings.accentColor,
      font: settings.font,
    },
    onSubmit: async ({ value }) => {
      await saveSettings.mutateAsync(value)
    },
  })

  const publishedProjects = allProjects.filter((p) => p.status === 'published' && p.isVisible)
  const publishedCertifications = allCertifications.filter((c) => c.status === 'published')

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground text-base font-bold">Resume</h2>
          <p className="text-muted-foreground text-xs">Configure and generate your PDF resume.</p>
        </div>
        {cv?.data?.url && (
          <Link to="/resume" target="_blank">
            <Button variant="outline" size="sm">
              <IconFileText className="size-4" />
              View Public Page
            </Button>
          </Link>
        )}
      </div>

      {/* Stats card */}
      <div className="border-border rounded-lg border p-4">
        <p className="text-muted-foreground text-[10px] font-medium tracking-widest uppercase">
          Total Downloads
        </p>
        <p className="text-foreground mt-1 text-3xl font-bold">{stats.downloadCount}</p>
        {cv?.data?.uploadedAt && (
          <p className="text-muted-foreground mt-1 text-xs">
            Last generated:{' '}
            {new Date(cv.data.uploadedAt).toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        )}
      </div>

      {/* Appearance settings form */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          void form.handleSubmit()
        }}
        className="border-border flex flex-col gap-4 rounded-lg border p-4"
      >
        <h3 className="text-sm font-semibold">Appearance Settings</h3>

        <form.Field name="template">
          {(field) => {
            const isInvalid = field.state.meta.errors.length > 0
            return (
              <Field className="flex flex-col gap-1.5">
                <FieldLabel htmlFor="template">Template</FieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={(v) => field.handleChange(v as ResumeTemplate)}
                >
                  <SelectTrigger id="template" aria-invalid={isInvalid}>
                    <SelectValue placeholder="Select template">
                      {TEMPLATE_LABELS[field.state.value]}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {RESUME_TEMPLATES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {TEMPLATE_LABELS[t]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="font">
          {(field) => {
            const isInvalid = field.state.meta.errors.length > 0
            return (
              <Field className="flex flex-col gap-1.5">
                <FieldLabel htmlFor="font">Font</FieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={(v) => field.handleChange(v as ResumeFont)}
                >
                  <SelectTrigger id="font" aria-invalid={isInvalid}>
                    <SelectValue placeholder="Select font">
                      {RESUME_FONT_LABELS[field.state.value]}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {RESUME_FONTS.map((f) => (
                      <SelectItem key={f} value={f}>
                        {RESUME_FONT_LABELS[f]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <form.Field name="accentColor">
          {(field) => {
            const isInvalid = field.state.meta.errors.length > 0
            return (
              <Field className="flex flex-col gap-1.5">
                <FieldLabel htmlFor="accentColor">Accent Color</FieldLabel>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="border-border h-9 w-12 cursor-pointer rounded border bg-transparent p-0.5"
                  />
                  <Input
                    id="accentColor"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="#3b82f6"
                    className="w-32 font-mono text-sm"
                    aria-invalid={isInvalid}
                  />
                </div>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </form.Field>

        <div className="flex justify-end">
          <form.Subscribe selector={(s) => s.isSubmitting}>
            {(isSubmitting) => (
              <Button type="submit" disabled={isSubmitting} variant="outline">
                {isSubmitting && <Spinner data-icon="inline-start" />}
                Save Settings
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>

      {/* Projects on resume */}
      <div className="border-border flex flex-col gap-3 rounded-lg border p-4">
        <div>
          <h3 className="text-sm font-semibold">Projects on Resume</h3>
          <p className="text-muted-foreground mt-0.5 text-xs">
            Select which published projects to include in the generated PDF.
          </p>
        </div>
        {publishedProjects.length > 0 ? (
          <div className="flex flex-col gap-2">
            {publishedProjects.map((project) => (
              <label key={project.id} className="flex cursor-pointer items-center gap-3 py-1">
                <input
                  type="checkbox"
                  checked={project.featuredAtResume}
                  onChange={(e) =>
                    toggleFeatured.mutate({
                      id: project.id,
                      value: e.target.checked,
                    })
                  }
                  className="size-4 rounded accent-current"
                />
                <span className="flex-1 text-sm">{project.title}</span>
                <span className="text-muted-foreground text-xs">
                  {project.tech.slice(0, 3).join(', ')}
                </span>
              </label>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-xs">No published visible projects found.</p>
        )}
      </div>

      {/* Certifications on resume */}
      <div className="border-border flex flex-col gap-3 rounded-lg border p-4">
        <div>
          <h3 className="text-sm font-semibold">Certifications on Resume</h3>
          <p className="text-muted-foreground mt-0.5 text-xs">
            Select which published certifications to include in the generated PDF.
          </p>
        </div>
        {publishedCertifications.length > 0 ? (
          <div className="flex flex-col gap-2">
            {publishedCertifications.map((cert) => (
              <label key={cert.id} className="flex cursor-pointer items-center gap-3 py-1">
                <input
                  type="checkbox"
                  checked={cert.featuredAtResume}
                  onChange={(e) =>
                    toggleCertFeatured.mutate({ id: cert.id, value: e.target.checked })
                  }
                  className="size-4 rounded accent-current"
                />
                <span className="flex-1 text-sm">{cert.title}</span>
                <span className="text-muted-foreground text-xs">{cert.issuer}</span>
              </label>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-xs">No published certifications found.</p>
        )}
      </div>

      {/* Preview */}
      <div className="border-border flex flex-col gap-3 rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold">Preview</h3>
            <p className="text-muted-foreground mt-0.5 text-xs">
              Render a preview using your current settings without uploading.
            </p>
          </div>
          <form.Subscribe
            selector={(s) => ({
              template: s.values.template,
              accentColor: s.values.accentColor,
              font: s.values.font,
            })}
          >
            {({ template, accentColor, font }) => (
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={preview.isPending}
                onClick={() => preview.mutate({ template, accentColor, font })}
              >
                {preview.isPending ? (
                  <Spinner data-icon="inline-start" />
                ) : (
                  <IconEye className="size-4" />
                )}
                {previewDataUrl ? 'Refresh Preview' : 'Load Preview'}
              </Button>
            )}
          </form.Subscribe>
        </div>
        {previewDataUrl && (
          <iframe
            src={previewDataUrl}
            className="border-border w-full rounded border"
            style={{ height: '70vh' }}
            title="Resume Preview"
          />
        )}
      </div>

      {/* Generate button */}
      <div>
        <Button
          size="lg"
          onClick={() => generate.mutate()}
          disabled={generate.isPending}
          className="w-fit"
        >
          {generate.isPending ? (
            <Spinner data-icon="inline-start" />
          ) : (
            <IconRefresh className="size-4" />
          )}
          Generate &amp; Upload Resume
        </Button>
        <p className="text-muted-foreground mt-2 text-xs">
          Renders the PDF with your current settings and uploads it to storage. The public resume
          page will update immediately.
        </p>
      </div>
    </div>
  )
}
