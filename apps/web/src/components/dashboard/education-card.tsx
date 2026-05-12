import { DEGREE_TYPE_LABELS } from '@portofolio/constants'
import type { Education } from '@portofolio/types/education.types'
import { IconGripVertical, IconPencil, IconSchool } from '@tabler/icons-react'
import { useNavigate } from '@tanstack/react-router'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Separator } from '../ui/separator'

interface EducationCardProps {
  education: Education
  dragHandleProps?: React.HTMLAttributes<HTMLButtonElement>
}

export function EducationCard({ education, dragHandleProps }: EducationCardProps) {
  const navigate = useNavigate()

  const startYear = new Date(education.startYear).getFullYear()
  const endYear = education.endYear ? new Date(education.endYear).getFullYear() : 'Present'

  return (
    <Card className="px-4 py-3">
      <CardContent className="flex items-center gap-3 px-0">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex flex-row items-center gap-2">
            <button
              className="text-muted-foreground/40 hover:text-muted-foreground flex cursor-grab items-center active:cursor-grabbing"
              {...dragHandleProps}
            >
              <IconGripVertical className="size-4 shrink-0" />
            </button>
            <Avatar className="after:rounded-md size-9 shrink-0 rounded-md">
              <AvatarFallback className="rounded-md text-xs font-semibold">
                <IconSchool className="size-4" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-foreground truncate text-sm font-semibold leading-tight">
              {education.institution}
            </span>
            <span className="text-muted-foreground text-xs">
              {DEGREE_TYPE_LABELS[education.degreeLevel]}, {education.major}
            </span>
            <span className="text-muted-foreground text-xs">
              {startYear} — {endYear}
            </span>
          </div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex items-center justify-start gap-2 p-0">
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            navigate({
              to: '/dashboard/education/$educationId/edit',
              params: { educationId: education.id },
            })
          }
        >
          <IconPencil className="size-3.5" />
          Edit
        </Button>
      </CardFooter>
    </Card>
  )
}
