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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { globalErrorToast, globalSuccessToast } from "@/lib/toasts";
import { trpc } from "@/utils/trpc";
import {
  SOCIAL_ICON_MAP,
  SOCIAL_ICON_NAMES,
  SocialIconName,
} from "@portofolio/constants";
import { updateSocialLinkSchema } from "@portofolio/schema/social-link.schema";
import { useForm } from "@tanstack/react-form";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute(
  "/(core)/dashboard/social-links/$socialLinkId/edit",
)({
  beforeLoad: async ({ params, context }) => {
    await context.queryClient.ensureQueryData(
      context.trpc.socialLink.getById.queryOptions({
        id: params.socialLinkId,
      }),
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { socialLinkId } = Route.useParams();
  const { data: socialLink } = useSuspenseQuery(
    trpc.socialLink.getById.queryOptions({ id: socialLinkId }),
  );

  const updateMutation = useMutation(
    trpc.socialLink.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.socialLink.getForDashboard.queryFilter(),
        );
        globalSuccessToast("Social link updated!");
        router.history.back();
      },
      onError: (err) => globalErrorToast(err.message),
    }),
  );

  const form = useForm({
    validators: { onSubmit: updateSocialLinkSchema },
    defaultValues: {
      id: socialLink.id,
      title: socialLink.title,
      url: socialLink.url,
      icon: socialLink.icon as SocialIconName,
      order: socialLink.order,
    } as z.infer<typeof updateSocialLinkSchema>,
    onSubmit: async ({ value }) => {
      await updateMutation.mutateAsync(value);
    },
  });

  return (
    <div className="flex min-h-[calc(100svh-var(--header-height)-2rem)] flex-1 flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-bold text-foreground">
          Edit Social Link
        </h2>
        <p className="text-xs text-muted-foreground">
          Update your social link details.
        </p>
      </div>

      <div className="flex-1 flex">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-1 w-full flex-col overflow-hidden"
        >
          <ScrollArea className="min-h-0 flex-1">
            <div className="p-4">
              <FieldGroup className="gap-4">
                <form.Field
                  name="title"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
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
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="e.g. GitHub"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="icon"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    const SelectedIcon =
                      SOCIAL_ICON_MAP[field.state.value as SocialIconName]
                        ?.icon;
                    return (
                      <Field
                        data-invalid={isInvalid}
                        className="flex flex-col gap-1.5"
                      >
                        <FieldLabel>Icon</FieldLabel>
                        <Select
                          value={field.state.value}
                          onValueChange={(v) =>
                            field.handleChange(v as SocialIconName)
                          }
                        >
                          <SelectTrigger aria-invalid={isInvalid}>
                            <SelectValue>
                              {field.state.value && (
                                <span className="flex items-center gap-2">
                                  {SelectedIcon && (
                                    <SelectedIcon className="size-4 shrink-0" />
                                  )}
                                  {
                                    SOCIAL_ICON_MAP[
                                      field.state.value as SocialIconName
                                    ]?.label
                                  }
                                </span>
                              )}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {SOCIAL_ICON_NAMES.map((name) => {
                              const meta = SOCIAL_ICON_MAP[name];
                              const ItemIcon = meta.icon;
                              return (
                                <SelectItem key={name} value={name}>
                                  <span className="flex items-center gap-2">
                                    <ItemIcon className="size-4 shrink-0" />
                                    {meta.label}
                                  </span>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="url"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field
                        data-invalid={isInvalid}
                        className="flex flex-col gap-1.5"
                      >
                        <FieldLabel htmlFor={field.name}>URL</FieldLabel>
                        <Input
                          id={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="https://github.com/username"
                        />
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
                      field.state.meta.isTouched && !field.state.meta.isValid;
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
            </div>
          </ScrollArea>

          <Separator />

          <footer className="flex shrink-0 items-center justify-end p-4 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.history.back()}
            >
              Cancel
            </Button>
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
