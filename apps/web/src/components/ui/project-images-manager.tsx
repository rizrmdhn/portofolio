import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { globalErrorToast, globalSuccessToast } from '@/lib/toasts'
import { cn } from '@/lib/utils'
import { toFormData } from '@/utils/form-data-mapper'
import { trpc } from '@/utils/trpc'
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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useId, useRef, useState } from 'react'

type ProjectImage = {
  id: string
  projectId: string
  imageUrl: string
  isCover: boolean
  order: number
  createdAt: string
}

const MAX_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPT = 'image/jpeg, image/png, image/webp'

interface ProjectImagesManagerProps {
  projectId: string
}

export default function ProjectImagesManager({ projectId }: ProjectImagesManagerProps) {
  const queryClient = useQueryClient()
  const dndId = useId()

  const imagesQueryOptions = trpc.project.getImages.queryOptions({ projectId })
  const { data, isLoading } = useQuery(imagesQueryOptions)

  // Local ordering for snappy drag-and-drop; kept in sync with the server data.
  const [items, setItems] = useState<Array<ProjectImage>>([])
  useEffect(() => {
    if (data) setItems(data as Array<ProjectImage>)
  }, [data])

  const invalidate = useCallback(async () => {
    await queryClient.invalidateQueries(trpc.project.getImages.queryFilter({ projectId }))
    await queryClient.invalidateQueries(trpc.project.getPaginatedProjects.queryFilter())
    await queryClient.invalidateQueries(trpc.project.getById.queryFilter({ id: projectId }))
  }, [projectId, queryClient])

  const addMutation = useMutation(
    trpc.project.addImage.mutationOptions({
      onSuccess: async () => {
        await invalidate()
        globalSuccessToast('Image added')
      },
      onError: (error) => globalErrorToast(error.message || 'Failed to add image'),
    }),
  )

  const removeMutation = useMutation(
    trpc.project.removeImage.mutationOptions({
      onSuccess: async () => {
        await invalidate()
        globalSuccessToast('Image removed')
      },
      onError: (error) => globalErrorToast(error.message || 'Failed to remove image'),
    }),
  )

  const setCoverMutation = useMutation(
    trpc.project.setCover.mutationOptions({
      onSuccess: async () => {
        await invalidate()
        globalSuccessToast('Cover updated')
      },
      onError: (error) => globalErrorToast(error.message || 'Failed to set cover'),
    }),
  )

  const reorderMutation = useMutation(
    trpc.project.reorderImages.mutationOptions({
      onSuccess: async () => {
        await invalidate()
      },
      onError: async (error) => {
        globalErrorToast(error.message || 'Failed to reorder images')
        await invalidate()
      },
    }),
  )

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = items.findIndex((i) => i.id === active.id)
    const newIndex = items.findIndex((i) => i.id === over.id)
    if (oldIndex === -1 || newIndex === -1) return

    const reordered = arrayMove(items, oldIndex, newIndex)
    setItems(reordered)
    reorderMutation.mutate(reordered.map((img, index) => ({ id: img.id, order: index })))
  }

  function handleAddFile(file: File) {
    const formData = toFormData({ projectId, picture: file })
    addMutation.mutate(formData)
  }

  return (
    <div className="flex flex-col gap-4">
      <AddImageDropzone onFile={handleAddFile} isUploading={addMutation.isPending} />

      {isLoading ? (
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <Spinner /> Loading images...
        </div>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No images yet. Add one above — the first image becomes the cover.
        </p>
      ) : (
        <DndContext
          id={dndId}
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items.map((i) => i.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {items.map((image) => (
                <SortableImageCard
                  key={image.id}
                  image={image}
                  onSetCover={() =>
                    setCoverMutation.mutate({ id: image.id, projectId })
                  }
                  onRemove={() => removeMutation.mutate({ id: image.id })}
                  isBusy={
                    removeMutation.isPending ||
                    setCoverMutation.isPending ||
                    reorderMutation.isPending
                  }
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
  onSetCover,
  onRemove,
  isBusy,
}: {
  image: ProjectImage
  onSetCover: () => void
  onRemove: () => void
  isBusy: boolean
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
      <img src={image.imageUrl} alt="Project" className="aspect-video w-full object-cover" />

      {/* Drag handle */}
      <button
        type="button"
        className="bg-background/80 text-muted-foreground hover:text-foreground absolute top-1.5 left-1.5 cursor-grab rounded-md p-1 backdrop-blur-sm active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <IconGripVertical className="size-4" />
      </button>

      {/* Cover badge */}
      {image.isCover && (
        <span className="bg-primary text-primary-foreground absolute top-1.5 right-1.5 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium">
          <IconStarFilled className="size-3" />
          Cover
        </span>
      )}

      {/* Actions */}
      <div
        className={cn(
          'absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 p-1.5',
          'bg-linear-to-t from-black/70 to-transparent',
        )}
      >
        {!image.isCover ? (
          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="h-7 px-2 text-xs"
            onClick={onSetCover}
            disabled={isBusy}
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
          disabled={isBusy}
        >
          <IconTrash className="size-3.5" />
        </Button>
      </div>
    </div>
  )
}

function AddImageDropzone({
  onFile,
  isUploading,
}: {
  onFile: (file: File) => void
  isUploading: boolean
}) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const validate = (file: File): string | null => {
    if (!file.type.startsWith('image/')) return 'File must be an image'
    if (file.size > MAX_SIZE) return 'File size must be less than 5MB'
    return null
  }

  const handleFile = (file: File) => {
    const validationError = validate(file)
    if (validationError) {
      setError(validationError)
      return
    }
    setError(null)
    onFile(file)
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
          e.target.value = ''
        }}
      />
      <button
        type="button"
        disabled={isUploading}
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
          const file = e.dataTransfer.files?.[0]
          if (file) handleFile(file)
        }}
        className={cn(
          'flex w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed px-4 py-6 transition-colors',
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-muted-foreground/50',
          isUploading && 'cursor-not-allowed opacity-60',
        )}
      >
        <div className="border-border flex size-8 items-center justify-center rounded-full border">
          {isUploading ? <Spinner /> : <IconCloudUpload className="size-4" />}
        </div>
        <span className="text-foreground text-sm font-medium">
          {isUploading ? 'Uploading...' : 'Add image'}
        </span>
        <span className="text-muted-foreground text-xs">
          Choose a file or drag & drop · JPG, PNG, WebP up to 5MB
        </span>
      </button>
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  )
}
