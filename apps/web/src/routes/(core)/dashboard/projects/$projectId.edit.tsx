import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import SingleImageUpload from "@/components/ui/single-image-upload";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { trpc } from "@/utils/trpc";
import { COLOR_VALUES } from "@portofolio/constants";
import { updateProjectSchema } from "@portofolio/schema/project.schema";
import {
  IconLink,
  IconPencil,
  IconSettings,
  IconUpload,
  IconX,
  TablerIcon,
} from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";

export const Route = createFileRoute(
  "/(core)/dashboard/projects/$projectId/edit",
)({
  beforeLoad: async ({ params, context }) => {
    await context.queryClient.ensureQueryData(
      context.trpc.project.getById.queryOptions({ id: params.projectId }),
    );
  },
  component: RouteComponent,
});

const TAB_TRIGGERS: { icon: TablerIcon; title: string; value: string }[] = [
  { icon: IconPencil, title: "Content", value: "content" },
  { icon: IconLink, title: "Links", value: "links" },
  { icon: IconUpload, title: "Media", value: "media" },
  { icon: IconSettings, title: "Settings", value: "settings" },
];

function RouteComponent() {
  const { projectId } = Route.useParams();
  const { data: project } = useSuspenseQuery(
    trpc.project.getById.queryOptions({ id: projectId }),
  );

  const [techInput, setTechInput] = useState("");
  const [existingImageUrl, setExistingImageUrl] = useState(
    project.imageUrl ?? null,
  );

  const form = useForm({
    validators: { onSubmit: updateProjectSchema },
    defaultValues: {
      id: project.id,
      title: project.title,
      description: project.description,
      longDescription: project.longDescription ?? undefined,
      tech: project.tech,
      githubUrl: project.githubUrl ?? undefined,
      liveUrl: project.liveUrl ?? undefined,
      playstoreUrl: project.playstoreUrl ?? undefined,
      appstoreUrl: project.appstoreUrl ?? undefined,
      coverColor: project.coverColor,
      status: project.status,
      isVisible: project.isVisible,
      order: project.order,
      featured: project.featureAt !== null,
      picture: undefined,
    } as z.infer<typeof updateProjectSchema>,
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <div className="flex min-h-[calc(100svh-var(--header-height)-2rem)] flex-1 flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-bold text-foreground">Edit project</h2>
        <p className="text-xs text-muted-foreground">
          Update your portfolio project
        </p>
      </div>
      <div className="flex flex-1">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-1 w-full flex-col overflow-hidden"
        >
          <Tabs defaultValue="content" className="min-h-0 flex-1 gap-0">
            <div className="shrink-0 px-4 pt-4 pb-2">
              <TabsList variant="line">
                {TAB_TRIGGERS.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    <tab.icon />
                    {tab.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <ScrollArea className="min-h-0 flex-1">
              <div className="px-4 pb-4">
                {/* Content */}
                <TabsContent value="content">
                  <FieldGroup className="gap-4">
                    <form.Field
                      name="title"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field
                            data-invalid={isInvalid}
                            className="flex flex-col gap-1.5"
                          >
                            <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                            <Input
                              id={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              aria-invalid={isInvalid}
                              placeholder="My awesome project"
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />

                    <form.Field
                      name="description"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field
                            data-invalid={isInvalid}
                            className="flex flex-col gap-1.5"
                          >
                            <FieldLabel htmlFor={field.name}>
                              Description
                            </FieldLabel>
                            <Textarea
                              id={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              placeholder="Short description of your project"
                              rows={3}
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />

                    <form.Field
                      name="longDescription"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field
                            data-invalid={isInvalid}
                            className="flex flex-col gap-1.5"
                          >
                            <FieldLabel htmlFor={field.name}>
                              Long Description
                            </FieldLabel>
                            <Textarea
                              id={field.name}
                              value={field.state.value ?? ""}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              placeholder="Detailed description of your project"
                              rows={6}
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />

                    <form.Field
                      name="tech"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field
                            data-invalid={isInvalid}
                            className="flex flex-col gap-1.5"
                          >
                            <FieldLabel>Technologies</FieldLabel>
                            <Input
                              value={techInput}
                              onChange={(e) => setTechInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === ",") {
                                  e.preventDefault();
                                  const trimmed = techInput
                                    .trim()
                                    .replace(/,$/, "");
                                  if (
                                    trimmed &&
                                    !field.state.value.includes(trimmed)
                                  ) {
                                    field.handleChange([
                                      ...field.state.value,
                                      trimmed,
                                    ]);
                                    setTechInput("");
                                  }
                                }
                              }}
                              placeholder="React, TypeScript... (Enter to add)"
                            />
                            {field.state.value.length > 0 && (
                              <div className="flex flex-wrap gap-1.5">
                                {field.state.value.map((tech) => (
                                  <Badge
                                    key={tech}
                                    variant="secondary"
                                    className="gap-1"
                                  >
                                    {tech}
                                    <button
                                      type="button"
                                      onClick={() =>
                                        field.handleChange(
                                          field.state.value.filter(
                                            (t) => t !== tech,
                                          ),
                                        )
                                      }
                                    >
                                      <IconX className="size-3" />
                                    </button>
                                  </Badge>
                                ))}
                              </div>
                            )}
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />
                  </FieldGroup>
                </TabsContent>

                {/* Links */}
                <TabsContent value="links">
                  <FieldGroup className="gap-4">
                    <FieldDescription>
                      External links shown on project card. Leave blank to hide.
                    </FieldDescription>
                    <form.Field
                      name="githubUrl"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field
                            data-invalid={isInvalid}
                            className="flex flex-col gap-1.5"
                          >
                            <FieldLabel htmlFor={field.name}>
                              GitHub URL
                            </FieldLabel>
                            <Input
                              id={field.name}
                              value={field.state.value ?? ""}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value || undefined)
                              }
                              placeholder="https://github.com/..."
                              type="url"
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />

                    <form.Field
                      name="liveUrl"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field
                            data-invalid={isInvalid}
                            className="flex flex-col gap-1.5"
                          >
                            <FieldLabel htmlFor={field.name}>
                              Live URL
                            </FieldLabel>
                            <Input
                              id={field.name}
                              value={field.state.value ?? ""}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value || undefined)
                              }
                              placeholder="https://..."
                              type="url"
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />

                    <form.Field
                      name="playstoreUrl"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field
                            data-invalid={isInvalid}
                            className="flex flex-col gap-1.5"
                          >
                            <FieldLabel htmlFor={field.name}>
                              Play Store URL
                            </FieldLabel>
                            <Input
                              id={field.name}
                              value={field.state.value ?? ""}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value || undefined)
                              }
                              placeholder="https://play.google.com/..."
                              type="url"
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />

                    <form.Field
                      name="appstoreUrl"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field
                            data-invalid={isInvalid}
                            className="flex flex-col gap-1.5"
                          >
                            <FieldLabel htmlFor={field.name}>
                              App Store URL
                            </FieldLabel>
                            <Input
                              id={field.name}
                              value={field.state.value ?? ""}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value || undefined)
                              }
                              placeholder="https://apps.apple.com/..."
                              type="url"
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />
                  </FieldGroup>
                </TabsContent>

                {/* Media */}
                <TabsContent value="media">
                  <FieldGroup className="gap-4">
                    <form.Field
                      name="picture"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field
                            data-invalid={isInvalid}
                            className="flex flex-col gap-2"
                          >
                            <FieldLabel>Cover Image</FieldLabel>
                            <FieldDescription>
                              Recommended size: 1200x630px. Max 5MB.
                            </FieldDescription>
                            <SingleImageUpload
                              {...field}
                              value={field.state.value ?? existingImageUrl}
                              onChange={(file) => {
                                if (file === null) setExistingImageUrl(null);
                                field.handleChange(file ?? undefined);
                              }}
                              error={field.state.meta.errors.join(", ")}
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />

                    <form.Field
                      name="coverColor"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field
                            data-invalid={isInvalid}
                            className="flex flex-col gap-2"
                          >
                            <FieldLabel>Cover Color</FieldLabel>
                            <FieldDescription>
                              Fallback when image unavailable
                            </FieldDescription>
                            <div className="flex flex-wrap gap-2">
                              {COLOR_VALUES.map((color) => (
                                <button
                                  key={color}
                                  type="button"
                                  onClick={() => field.handleChange(color)}
                                  className={cn(
                                    "size-7 rounded-md border-2 transition-transform hover:scale-110",
                                    field.state.value === color
                                      ? "scale-110 border-foreground"
                                      : "border-transparent",
                                  )}
                                  style={{ backgroundColor: color }}
                                  title={color}
                                />
                              ))}
                            </div>
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />
                  </FieldGroup>
                </TabsContent>

                {/* Settings */}
                <TabsContent value="settings">
                  <FieldGroup className="gap-4">
                    <form.Field
                      name="status"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field
                            data-invalid={isInvalid}
                            className="flex flex-col gap-1.5"
                          >
                            <FieldLabel>Status</FieldLabel>
                            <ToggleGroup
                              variant="outline"
                              value={[field.state.value]}
                              onValueChange={(values) => {
                                const next = values.find(
                                  (v) => v !== field.state.value,
                                );
                                if (next)
                                  field.handleChange(
                                    next as typeof field.state.value,
                                  );
                              }}
                            >
                              <ToggleGroupItem value="draft">
                                Draft
                              </ToggleGroupItem>
                              <ToggleGroupItem value="published">
                                Published
                              </ToggleGroupItem>
                            </ToggleGroup>
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />

                    <form.Field
                      name="isVisible"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field
                            data-invalid={isInvalid}
                            className="flex items-center justify-between"
                          >
                            <div className="flex flex-col gap-0.5">
                              <FieldLabel>Visibility</FieldLabel>
                            </div>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={field.state.value}
                                onCheckedChange={field.handleChange}
                              />
                              <p className="text-sm text-foreground">
                                Visible in public portfolio
                              </p>
                            </div>
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />

                    <form.Field
                      name="featured"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field
                            data-invalid={isInvalid}
                            className="flex items-center justify-between"
                          >
                            <div className="flex flex-col gap-0.5">
                              <FieldLabel>Feature on homepage</FieldLabel>
                            </div>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={field.state.value}
                                onCheckedChange={field.handleChange}
                              />
                              <p className="text-sm text-foreground">
                                Show in featured section on homepage
                              </p>
                            </div>
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />

                    <form.Field
                      name="order"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field
                            data-invalid={isInvalid}
                            className="flex flex-col gap-1.5"
                          >
                            <FieldLabel htmlFor={field.name}>Order</FieldLabel>
                            <Input
                              id={field.name}
                              type="number"
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(Number(e.target.value))
                              }
                            />
                            <FieldDescription>Lower = earlier</FieldDescription>
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />
                  </FieldGroup>
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>

          <Separator />

          <footer className="flex shrink-0 items-center justify-end px-4 py-4 bg-surface">
            <form.Subscribe
              selector={(state) => state.isSubmitting}
              children={(isSubmitting) => (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
                  Save Changes
                </Button>
              )}
            />
          </footer>
        </form>
      </div>
    </div>
  );
}
