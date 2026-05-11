import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import {
  IconAlertTriangle,
  IconCircleX,
  IconCloudUpload,
  IconPhoto,
  IconX,
} from "@tabler/icons-react";
import mime from "mime-types";
import { forwardRef, useCallback, useEffect, useState } from "react";

interface ImageFile {
  file: File;
  preview: string;
  progress: number;
  status: "uploading" | "completed" | "error";
  error?: string;
}

interface SingleImageUploadProps {
  maxSize?: number;
  accept?: string;
  className?: string;
  value?: File | string | null;
  onChange?: (file: File | null) => void;
  onBlur?: () => void;
  name?: string;
  disabled?: boolean;
  error?: string;
}

const SingleImageUpload = forwardRef<HTMLDivElement, SingleImageUploadProps>(
  (
    {
      maxSize = 2 * 1024 * 1024, // 2MB
      accept = "image/jpeg, image/png",
      className,
      value,
      onChange,
      onBlur: _onBlur,
      name: _name,
      disabled = false,
      error,
    },
    ref,
  ) => {
    const [image, setImage] = useState<ImageFile | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    // Handle external value changes (e.g., from form reset)
    useEffect(() => {
      if (value === null || value === undefined) {
        // Clear the image
        if (image) {
          URL.revokeObjectURL(image.preview);
        }
        setImage(null);
        setPreview(null);
      } else if (typeof value === "string") {
        // URL string provided
        setPreview(value);
        setImage(null);
      } else if (value instanceof File) {
        // Only handle non-empty File objects
        if (value.size > 0) {
          if (!image || image.file !== value) {
            const newPreview = URL.createObjectURL(value);
            setImage({
              file: value,
              preview: newPreview,
              progress: 100,
              status: "completed",
            });
            setPreview(newPreview);
          }
        } else {
          // Empty file - clear the preview
          if (image) {
            URL.revokeObjectURL(image.preview);
          }
          setImage(null);
          setPreview(null);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally omitting `image` to avoid infinite loop
    }, [value]);

    const addImage = useCallback(
      (file: File) => {
        const validateFile = (f: File): string | null => {
          if (!f.type.startsWith("image/")) {
            return "File must be an image";
          }
          if (f.size > maxSize) {
            return `File size must be less than ${(maxSize / 1024 / 1024).toFixed(1)}MB`;
          }
          return null;
        };

        const simulateUpload = (uploadedFile: File) => {
          let progress = 0;
          const interval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress >= 100) {
              progress = 100;
              clearInterval(interval);

              setImage((prev) =>
                prev
                  ? {
                      ...prev,
                      progress: 100,
                      status: "completed",
                    }
                  : null,
              );

              // Notify parent component
              onChange?.(uploadedFile);
            } else {
              setImage((prev) => (prev ? { ...prev, progress } : null));
            }
          }, 100);
        };

        const validationError = validateFile(file);
        if (validationError) {
          setUploadError(validationError);
          return;
        }

        setUploadError(null);

        // Clean up previous preview
        if (image) {
          URL.revokeObjectURL(image.preview);
        }

        const imageFile: ImageFile = {
          file,
          preview: URL.createObjectURL(file),
          progress: 0,
          status: "uploading",
        };

        setImage(imageFile);
        setPreview(imageFile.preview);

        // Simulate upload progress
        simulateUpload(file);
      },
      [image, maxSize, onChange],
    );

    const removeImage = useCallback(() => {
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
      setImage(null);
      setPreview(null);
      setUploadError(null);
      onChange?.(null);
    }, [image, onChange]);

    const handleDragEnter = useCallback(
      (e: React.DragEvent) => {
        if (disabled) return;
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
      },
      [disabled],
    );

    const handleDragLeave = useCallback(
      (e: React.DragEvent) => {
        if (disabled) return;
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
      },
      [disabled],
    );

    const handleDragOver = useCallback(
      (e: React.DragEvent) => {
        if (disabled) return;
        e.preventDefault();
        e.stopPropagation();
      },
      [disabled],
    );

    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        if (disabled) return;
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        const file = files[0];
        if (file) {
          addImage(file);
        }
      },
      [addImage, disabled],
    );

    const openFileDialog = useCallback(() => {
      if (disabled) return;
      const input = document.createElement("input");
      input.type = "file";
      input.accept = accept;
      input.onchange = (e) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
          addImage(file);
        }
      };
      input.click();
    }, [accept, addImage, disabled]);

    const formatBytes = (bytes: number): string => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
    };

    const renderMimeTypes = (types: string): string => {
      return types
        .split(",")
        .map((type) => type.trim())
        .map((type) => mime.extension(type))
        .filter((ext): ext is string => !!ext)
        .join(", ");
    };

    const displayError = error || uploadError;

    return (
      <div ref={ref} className={cn("w-full", className)}>
        {/* Image Preview */}
        {preview && (
          <div className="mb-6">
            <Card className="group relative flex w-full items-center justify-center rounded-md bg-accent/50 shadow-none">
              <div className="relative size-64">
                <img
                  src={preview}
                  className="size-64 rounded-md object-cover"
                  alt="Upload preview"
                />

                {/* Remove Button Overlay - Inside the image */}
                {!disabled && (
                  <Button
                    onClick={removeImage}
                    variant="outline"
                    size="icon"
                    className="absolute -top-2 -right-2 size-7 rounded-full bg-white opacity-100 shadow-sm hover:bg-gray-100"
                    type="button"
                  >
                    <IconX className="size-4" />
                  </Button>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* Upload Area - Only show if no image */}
        {!preview && (
          <Card
            className={cn(
              "rounded-md border-dashed shadow-none transition-colors",
              isDragging && !disabled
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-muted-foreground/50",
              disabled && "cursor-not-allowed opacity-50",
              displayError && "border-destructive",
            )}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <CardContent className="text-center">
              <div className="mx-auto mb-3 flex size-8 items-center justify-center rounded-full border border-border">
                <IconCloudUpload className="size-4" />
              </div>
              <h3 className="text-2sm mb-0.5 font-semibold text-foreground">
                Choose a file or drag & drop here.
              </h3>
              <span className="mb-3 block text-xs font-normal text-secondary-foreground">
                {renderMimeTypes(accept)} up to {formatBytes(maxSize)}.
              </span>
              <Button
                size="sm"
                onClick={openFileDialog}
                disabled={disabled}
                type="button"
              >
                Browse File
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Upload Progress Card */}
        {image && image.status === "uploading" && (
          <div className="mt-6">
            <Card className="rounded-md shadow-none">
              <CardContent className="flex items-center gap-2 p-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border">
                  <IconPhoto className="size-4 text-muted-foreground" />
                </div>
                <div className="flex w-full flex-col gap-1.5">
                  <div className="-mt-2 flex w-full items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs leading-none font-medium text-foreground">
                        {image.file.name}
                      </span>
                      <span className="text-xs leading-none font-normal text-muted-foreground">
                        {formatBytes(image.file.size)}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        Uploading... {Math.round(image.progress)}%
                      </p>
                    </div>
                    <Button
                      onClick={removeImage}
                      variant="ghost"
                      size="icon"
                      className="size-6"
                      disabled={disabled}
                      type="button"
                    >
                      <IconCircleX className="size-3.5" />
                    </Button>
                  </div>

                  <Progress
                    value={image.progress}
                    className={cn(
                      "h-1 transition-all duration-300",
                      "[&>div]:bg-zinc-950 dark:[&>div]:bg-zinc-50",
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Error Message */}
        {displayError && (
          <Alert variant="destructive" className="mt-5">
            <IconAlertTriangle />
            <AlertTitle>File upload error</AlertTitle>
            <AlertDescription>{displayError}</AlertDescription>
          </Alert>
        )}
      </div>
    );
  },
);

SingleImageUpload.displayName = "SingleImageUpload";

export default SingleImageUpload;
