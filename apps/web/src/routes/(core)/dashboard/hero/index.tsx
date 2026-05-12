import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { globalErrorToast, globalSuccessToast } from "@/lib/toasts";
import { trpc } from "@/utils/trpc";
import {
  AVAILABILITY_STATUS_LABELS,
  AVAILABILITY_STATUS_TYPES,
  AvailabilityStatus,
} from "@portofolio/constants";
import { updateProfileSchema } from "@portofolio/schema/profile.schema";
import { useForm } from "@tanstack/react-form";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";


export const Route = createFileRoute("/(core)/dashboard/hero/")({
  beforeLoad: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      context.trpc.profile.get.queryOptions(),
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();

  const { data } = useSuspenseQuery(trpc.profile.get.queryOptions());
  const updateProfile = useMutation(
    trpc.profile.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.profile.get.queryOptions());
        globalSuccessToast("Profile updated successfully");
      },
      onError: (error) => {
        globalErrorToast(error.message || "Failed to update profile");
      },
    }),
  );

  const form = useForm({
    validators: {
      onSubmit: updateProfileSchema,
    },
    defaultValues: {
      id: data?.id ?? "",
      name: data?.name ?? "",
      title: data?.title ?? "",
      bio: data?.bio ?? "",
      email: data?.email ?? "",
      availabilityStatus: (data?.availabilityStatus ??
        "unavailable") as AvailabilityStatus,
    },
    onSubmit: async ({ value }) => {
      await updateProfile.mutateAsync({
        ...value,
      });
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-bold text-foreground">Profile</h2>
        <p className="text-xs text-muted-foreground">
          Update your public profile information.
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="grid gap-2 "
      >
        <FieldGroup className="gap-4">
          <form.Field
            name="name"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field
                  data-invalid={isInvalid}
                  className="flex flex-col gap-1.5"
                >
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Your full name"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

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
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="e.g. Full Stack Developer"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Field
            name="email"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field
                  data-invalid={isInvalid}
                  className="flex flex-col gap-1.5"
                >
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="your@email.com"
                    type="email"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Field
            name="bio"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field
                  data-invalid={isInvalid}
                  className="flex flex-col gap-1.5"
                >
                  <FieldLabel htmlFor={field.name}>Bio</FieldLabel>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Write a short bio about yourself"
                    rows={4}
                  />
                  <p className="text-muted-foreground text-xs text-right">
                    {field.state.value.length} characters
                  </p>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Field
            name="availabilityStatus"
            children={(field) => (
              <Field className="flex flex-col gap-1.5">
                <FieldLabel>Availability Status</FieldLabel>
                <ToggleGroup
                  variant="outline"
                  value={[field.state.value]}
                  onValueChange={(values) => {
                    const next = values.find((v) => v !== field.state.value);
                    if (next) field.handleChange(next as AvailabilityStatus);
                  }}
                >
                  {AVAILABILITY_STATUS_TYPES.map((status) => (
                    <ToggleGroupItem
                      key={status}
                      value={status}
                      aria-label={status}
                    >
                      {AVAILABILITY_STATUS_LABELS[status]}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </Field>
            )}
          />

          <div className="flex justify-end">
            <form.Subscribe
              selector={(state) => state.isSubmitting}
              children={(isSubmitting) => (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
                  Save Changes
                </Button>
              )}
            />
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}
