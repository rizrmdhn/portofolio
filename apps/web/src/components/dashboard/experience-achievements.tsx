import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'

export function ExperienceAchievements({
  value,
  onChange,
  onBlur,
  invalid,
}: {
  value: Array<string>
  onChange: (value: Array<string>) => void
  onBlur: () => void
  invalid: boolean
}) {
  return (
    <FieldGroup>
      <FieldDescription>
        Optional achievements, displayed in the order entered below.
      </FieldDescription>
      {value.map((achievement, index) => (
        <Field key={index} data-invalid={invalid}>
          <FieldLabel htmlFor={`achievement-${index}`}>Achievement {index + 1}</FieldLabel>
          <Textarea
            id={`achievement-${index}`}
            value={achievement}
            maxLength={1000}
            aria-invalid={invalid}
            onBlur={onBlur}
            onChange={(event) =>
              onChange(value.map((item, i) => (i === index ? event.target.value : item)))
            }
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onChange(value.filter((_, i) => i !== index))}
          >
            Remove achievement {index + 1}
          </Button>
        </Field>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={value.length >= 50}
        onClick={() => onChange([...value, ''])}
      >
        Add achievement
      </Button>
    </FieldGroup>
  )
}
