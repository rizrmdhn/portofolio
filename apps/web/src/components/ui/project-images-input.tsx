import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  IconCloudUpload,
  IconGripVertical,
  IconStar,
  IconStarFilled,
  IconTrash,
} from '@tabler/icons-react'
import { useEffect, useId, useRef, useState } from 'react'
import { v7 as uuidv7 } from 'uuid'

export interface LocalProjectImage {
  /** temporary client-side id (uuid v7) — not a db id */
  id: string
  file: File
  preview: string
  /** cover marker — independent of position, mirrors the edit manager */
  isCover: boolean
}

const MAX_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPT = 'image/jpeg, image/png, image/webp'

interface ProjectImagesInputProps {
  value: Array<LocalProjectImage>
  onChange: (next: Array<LocalProjectImage>) => void
  disabled?: boolean
}

/**
 * Buffers selected images in local state with previews — nothing is uploaded
 * until the parent form submits. The first image (index 0) is the cover; drag
 * to reorder or use the star to promote an image to cover.
 */
export default function ProjectImagesInput({
  value,
  onChange,
  disabled = false,
}: ProjectImagesInputProps) {
  const dndId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Revoke every object URL when the component unmounts.
  const valueRef = useRef(value)
  valueRef.current = value
  useEffect(() => {
    return () => {
      for (const img of valueRef.current) URL.revokeObjectURL(img.preview)
    }
  }, [])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  function addFiles(files: Array<File>) {
    // Only the very first image (when none exist yet) auto-becomes the cover.
    const noCoverYet = value.length === 0
    const next: Array<LocalProjectImage> = []
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        setError('Only image files are allowed')
        continue
      }
      if (file.size > MAX_SIZE) {
        setError('Each image must be less than 5MB')
        continue
      }
      next.push({
        id: uuidv7(),
        file,
        preview: URL.createObjectURL(file),
        isCover: noCoverYet && next.length === 0,
      })
    }
    if (next.length > 0) {
      setError(null)
      onChange([...value, ...next])
    }
  }

  function removeImage(id: string) {
    const target = value.find((img) => img.id === id)
    if (target) URL.revokeObjectURL(target.preview)

    let remaining = value.filter((img) => img.id !== id)
    // If the cover was removed, promote the first remaining image.
    if (target?.isCover && remaining.length > 0 && !remaining.some((img) => img.isCover)) {
      remaining = remaining.map((img, idx) => (idx === 0 ? { ...img, isCover: true } : img))
    }
    onChange(remaining)
  }

  function setCover(id: string) {
    // Mark in place — position is unchanged, matching the edit manager.
    onChange(value.map((img) => ({ ...img, isCover: img.id === id })))
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = value.findIndex((i) => i.id === active.id)
    const newIndex = value.findIndex((i) => i.id === over.id)
    if (oldIndex === -1 || newIndex === -1) return
    onChange(arrayMove(value, oldIndex, newIndex))
  }

  return (
    <div className="flex flex-col gap-3">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) addFiles(Array.from(e.target.files))
          e.target.value = ''
        }}
      />

      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        onDragEnter={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          setIsDragging(false)
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          if (e.dataTransfer.files) addFiles(Array.from(e.dataTransfer.files))
        }}
        className={cn(
          'flex w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed px-4 py-6 transition-colors',
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-muted-foreground/50',
          disabled && 'cursor-not-allowed opacity-60',
        )}
      >
        <div className="border-border flex size-8 items-center justify-center rounded-full border">
          <IconCloudUpload className="size-4" />
        </div>
        <span className="text-foreground text-sm font-medium">Add images</span>
        <span className="text-muted-foreground text-xs">
          Choose files or drag & drop · JPG, PNG, WebP up to 5MB each
        </span>
      </button>

      {error && <p className="text-destructive text-xs">{error}</p>}

      {value.length > 0 && (
        <DndContext
          id={dndId}
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={value.map((i) => i.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {value.map((image) => (
                <SortableImageCard
                  key={image.id}
                  image={image}
                  isCover={image.isCover}
                  onSetCover={() => setCover(image.id)}
                  onRemove={() => removeImage(image.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  )
}

function SortableImageCard({
  image,
  isCover,
  onSetCover,
  onRemove,
}: {
  image: LocalProjectImage
  isCover: boolean
  onSetCover: () => void
  onRemove: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: image.id,
  })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
      className="group border-border bg-card relative overflow-hidden rounded-md border"
    >
      <img src={image.preview} alt="Preview" className="aspect-video w-full object-cover" />

      <button
        type="button"
        className="bg-background/80 text-muted-foreground hover:text-foreground absolute top-1.5 left-1.5 cursor-grab rounded-md p-1 backdrop-blur-sm active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <IconGripVertical className="size-4" />
      </button>

      {isCover && (
        <span className="bg-primary text-primary-foreground absolute top-1.5 right-1.5 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium">
          <IconStarFilled className="size-3" />
          Cover
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-linear-to-t from-black/70 to-transparent p-1.5">
        {!isCover ? (
          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="h-7 px-2 text-xs"
            onClick={onSetCover}
          >
            <IconStar className="size-3.5" />
            Set as Cover
          </Button>
        ) : (
          <span />
        )}

        <Button
          type="button"
          size="icon"
          variant="destructive"
          className="size-7"
          onClick={onRemove}
        >
          <IconTrash className="size-3.5" />
        </Button>
      </div>
    </div>
  )
}
