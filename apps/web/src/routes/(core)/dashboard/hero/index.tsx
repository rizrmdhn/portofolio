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
import { globalErrorToast, globalSuccessToast } from "@/lib/toasts";
import { trpc } from "@/utils/trpc";
import { useForm } from "@tanstack/react-form";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

const optionalUrl = z.union([z.literal(""), z.url()]);

const heroFormSchema = z.object({
  id: z.string(),
  name: z.string().min(2).max(256),
  title: z.string().min(2).max(256),
  bio: z.string().min(2).max(256),
  email: z.email(),
  githubUrl: optionalUrl,
  linkedinUrl: optionalUrl,
  twitterUrl: optionalUrl,
});

export const Route = createFileRoute("/(core)/dashboard/hero/")({
  beforeLoad: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      context.trpc.profile.get.queryOptions(),
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useSuspenseQuery(trpc.profile.get.queryOptions());
  const updateProfile = useMutation(trpc.profile.update.mutationOptions());

  const form = useForm({
    validators: {
      onSubmit: heroFormSchema,
    },
    defaultValues: {
      id: data?.id ?? "",
      name: data?.name ?? "",
      title: data?.title ?? "",
      bio: data?.bio ?? "",
      email: data?.email ?? "",
      githubUrl: data?.githubUrl ?? "",
      linkedinUrl: data?.linkedinUrl ?? "",
      twitterUrl: data?.twitterUrl ?? "",
    },
    onSubmit: async ({ value }) => {
      await updateProfile.mutateAsync({
        ...value,
        githubUrl: value.githubUrl || undefined,
        linkedinUrl: value.linkedinUrl || undefined,
        twitterUrl: value.twitterUrl || undefined,
      }, {
        onSuccess: () => {
          globalSuccessToast("Profile updated successfully");
        },
        onError: (error) => {
          globalErrorToast(error.message || "Failed to update profile");
        },
      });
    },
  });

  return (
    <div className="space-y-4">
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
            name="githubUrl"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field
                  data-invalid={isInvalid}
                  className="flex flex-col gap-1.5"
                >
                  <FieldLabel htmlFor={field.name}>GitHub URL</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="https://github.com/username"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Field
            name="linkedinUrl"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field
                  data-invalid={isInvalid}
                  className="flex flex-col gap-1.5"
                >
                  <FieldLabel htmlFor={field.name}>LinkedIn URL</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="https://linkedin.com/in/username"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Field
            name="twitterUrl"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field
                  data-invalid={isInvalid}
                  className="flex flex-col gap-1.5"
                >
                  <FieldLabel htmlFor={field.name}>Twitter URL</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="https://twitter.com/username"
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

          <form.Subscribe
            selector={(state) => state.isSubmitting}
            children={(isSubmitting) => (
              <Button type="submit" disabled={isSubmitting} className="w-fit">
                {isSubmitting ? <Spinner /> : null}
                Save Changes
              </Button>
            )}
          />
        </FieldGroup>
      </form>
    </div>
  );
}
