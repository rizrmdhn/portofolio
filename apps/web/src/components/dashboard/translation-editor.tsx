import { Button } from '@/components/ui/button'
import { CopyAiPromptButton } from '@/components/ui/copy-ai-prompt-button'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { MarkdownEditor } from '@/components/ui/markdown-editor'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import type { Locale } from '@portofolio/i18n'
import { DEFAULT_LOCALE, LOCALES, LOCALE_LABELS } from '@portofolio/i18n'
import { IconTrash } from '@tabler/icons-react'
import { useState } from 'react'

/** Locales authored as translations — every supported locale except the default
 * (which lives on the base record). */
export const NON_DEFAULT_LOCALES: ReadonlyArray<Locale> = LOCALES.filter(
  (l) => l !== DEFAULT_LOCALE,
)

export interface TranslationFieldDef {
  name: string
  label: string
  type: 'input' | 'textarea' | 'markdown'
  placeholder?: string
  /** Optional fields may be left blank. */
  optional?: boolean
}

/** Renders the right control for a translation field. Controlled by the caller. */
function FieldInput({
  id,
  field,
  value,
  onChange,
}: {
  id: string
  field: TranslationFieldDef
  value: string
  onChange: (value: string) => void
}) {
  if (field.type === 'textarea') {
    return (
      <Textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        rows={3}
      />
    )
  }
  if (field.type === 'markdown') {
    return (
      <MarkdownEditor id={id} value={value} onChange={onChange} placeholder={field.placeholder} rows={6} />
    )
  }
  return (
    <Input
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
    />
  )
}

/**
 * Label row with an optional "Translate with AI" button. When the server has a
 * Groq key configured it auto-translates the field's English source and fills the
 * field via `onTranslated`; otherwise it copies a prompt for an external
 * assistant. Hidden when there is no source text to translate.
 */
function FieldLabelRow({
  htmlFor,
  locale,
  field,
  sourceText,
  onTranslated,
}: {
  htmlFor: string
  locale: Locale
  field: TranslationFieldDef
  sourceText: string | undefined
  onTranslated: (text: string) => void
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <FieldLabel htmlFor={htmlFor}>{field.label}</FieldLabel>
      {sourceText?.trim() && (
        <CopyAiPromptButton
          label="Translate with AI"
          onResult={onTranslated}
          translate={{
            targetLanguage: LOCALE_LABELS[locale],
            fieldLabel: field.label,
            sourceText,
            markdown: field.type === 'markdown',
          }}
        />
      )}
    </div>
  )
}

interface LocaleSectionProps {
  locale: Locale
  fields: ReadonlyArray<TranslationFieldDef>
  initial: Record<string, string>
  /** Base (English) values, used to build per-field AI translation prompts. */
  sourceValues?: Record<string, string>
  hasExisting: boolean
  isSaving: boolean
  isRemoving: boolean
  onSave: (values: Record<string, string>) => void
  onRemove: () => void
}

function LocaleSection({
  locale,
  fields,
  initial,
  sourceValues,
  hasExisting,
  isSaving,
  isRemoving,
  onSave,
  onRemove,
}: LocaleSectionProps) {
  // Seeded once on mount; the parent gives this component a `key` derived from
  // `initial`, so it remounts (re-seeding) whenever the loaded data changes —
  // avoiding a prop→state sync effect.
  const [values, setValues] = useState<Record<string, string>>(initial)

  const set = (name: string, value: string) => setValues((prev) => ({ ...prev, [name]: value }))

  const requiredMissing = fields.some((f) => !f.optional && !values[f.name]?.trim())

  return (
    <div className="border-border flex flex-col gap-4 rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-foreground text-sm font-semibold">{LOCALE_LABELS[locale]}</h3>
        {hasExisting && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-destructive"
            onClick={onRemove}
            disabled={isRemoving}
          >
            {isRemoving ? <Spinner data-icon="inline-start" /> : <IconTrash className="size-4" />}
            Remove
          </Button>
        )}
      </div>

      {fields.map((field) => (
        <Field key={field.name} className="flex flex-col gap-1.5">
          <FieldLabelRow
            htmlFor={`${locale}-${field.name}`}
            locale={locale}
            field={field}
            sourceText={sourceValues?.[field.name]}
            onTranslated={(text) => set(field.name, text)}
          />
          <FieldInput
            id={`${locale}-${field.name}`}
            field={field}
            value={values[field.name] ?? ''}
            onChange={(value) => set(field.name, value)}
          />
        </Field>
      ))}

      <div className="flex justify-end">
        <Button type="button" onClick={() => onSave(values)} disabled={isSaving || requiredMissing}>
          {isSaving ? <Spinner data-icon="inline-start" /> : null}
          {hasExisting ? 'Update translation' : 'Save translation'}
        </Button>
      </div>
    </div>
  )
}

export interface TranslationRow {
  locale: string
  [key: string]: unknown
}

interface TranslationEditorProps {
  fields: ReadonlyArray<TranslationFieldDef>
  /** Existing translation rows from the server (one per locale). */
  translations: ReadonlyArray<TranslationRow>
  /** Base (English) values, used to build per-field AI translation prompts. */
  sourceValues?: Record<string, string>
  isLoading?: boolean
  savingLocale: Locale | null
  removingLocale: Locale | null
  onSave: (locale: Locale, values: Record<string, string>) => void
  onRemove: (locale: Locale) => void
}

/**
 * Renders one editable section per non-default locale for a content entity. The
 * base (English) copy is edited on the entity's main form; this only authors the
 * translated overlays. Presentational — the parent owns the tRPC query/mutations.
 */
export function TranslationEditor({
  fields,
  translations,
  sourceValues,
  isLoading,
  savingLocale,
  removingLocale,
  onSave,
  onRemove,
}: TranslationEditorProps) {
  return (
    <div className="flex flex-col gap-4">
      <FieldDescription>
        Provide translations for the fields below. Anything left empty falls back to the default
        (English) content on the public site.
      </FieldDescription>

      {isLoading ? (
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <Spinner /> Loading translations…
        </div>
      ) : (
        NON_DEFAULT_LOCALES.map((locale) => {
          const existing = translations.find((t) => t.locale === locale)
          const initial: Record<string, string> = {}
          for (const field of fields) {
            const raw = existing?.[field.name]
            initial[field.name] = typeof raw === 'string' ? raw : ''
          }
          return (
            <LocaleSection
              key={`${locale}:${JSON.stringify(initial)}`}
              locale={locale}
              fields={fields}
              initial={initial}
              sourceValues={sourceValues}
              hasExisting={Boolean(existing)}
              isSaving={savingLocale === locale}
              isRemoving={removingLocale === locale}
              onSave={(values) => onSave(locale, values)}
              onRemove={() => onRemove(locale)}
            />
          )
        })
      )}
    </div>
  )
}

/** Per-locale field values, keyed by locale then field name. */
export type TranslationDraft = Record<string, Record<string, string>>

/**
 * Controlled, button-less variant for **create** forms: the new entity has no id
 * yet, so translations can't be saved individually. The parent holds the draft
 * and persists each complete locale right after the base record is created.
 */
export function TranslationDraftEditor({
  fields,
  value,
  sourceValues,
  onChange,
}: {
  fields: ReadonlyArray<TranslationFieldDef>
  value: TranslationDraft
  /** Live base (English) values, used to build per-field AI translation prompts. */
  sourceValues?: Record<string, string>
  onChange: (locale: Locale, name: string, fieldValue: string) => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <FieldDescription>
        Optionally translate the fields below. A language is saved only when all its required fields
        are filled; anything left blank falls back to the default (English) content.
      </FieldDescription>

      {NON_DEFAULT_LOCALES.map((locale) => (
        <div key={locale} className="border-border flex flex-col gap-4 rounded-lg border p-4">
          <h3 className="text-foreground text-sm font-semibold">{LOCALE_LABELS[locale]}</h3>
          {fields.map((field) => (
            <Field key={field.name} className="flex flex-col gap-1.5">
              <FieldLabelRow
                htmlFor={`draft-${locale}-${field.name}`}
                locale={locale}
                field={field}
                sourceText={sourceValues?.[field.name]}
                onTranslated={(text) => onChange(locale, field.name, text)}
              />
              <FieldInput
                id={`draft-${locale}-${field.name}`}
                field={field}
                value={value[locale]?.[field.name] ?? ''}
                onChange={(fieldValue) => onChange(locale, field.name, fieldValue)}
              />
            </Field>
          ))}
        </div>
      ))}
    </div>
  )
}

/**
 * Helper for create forms: returns the locales in `draft` whose required fields
 * are all filled, ready to upsert after the entity is created.
 */
export function completeDraftLocales(
  draft: TranslationDraft,
  fields: ReadonlyArray<TranslationFieldDef>,
): Array<Locale> {
  return NON_DEFAULT_LOCALES.filter((locale) => {
    const values = draft[locale]
    if (!values) return false
    return fields.every((f) => f.optional || Boolean(values[f.name]?.trim()))
  })
}
