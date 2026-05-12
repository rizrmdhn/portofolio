import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
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
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { hasTabError } from "@/lib/has-tab-error";
import { globalErrorToast, globalSuccessToast } from "@/lib/toasts";
import { trpc } from "@/utils/trpc";
import {
  EXPERIENCE_STATUS_LABELS,
  EXPERIENCE_STATUS_TYPES,
} from "@portofolio/constants";
import { updateCertificationSchema } from "@portofolio/schema/certifcation.schema";
import { IconCertificate, IconSettings  } from "@tabler/icons-react";
import type {TablerIcon} from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import type {z} from "zod";

export const Route = createFileRoute(
  "/(core)/dashboard/certificate/$certificateId/edit",
)({
  beforeLoad: async ({ params, context }) => {
    await context.queryClient.ensureQueryData(
      context.trpc.certification.getById.queryOptions({
        id: params.certificateId,
      }),
    );
  },
  component: RouteComponent,
});

const TAB_TRIGGERS: Array<{ icon: TablerIcon; title: string; value: string }> = [
  { icon: IconCertificate, title: "Certificate Details", value: "details" },
  { icon: IconSettings, title: "Settings", value: "settings" },
];

const TAB_FIELDS: Record<string, Array<string>> = {
  details: [
    "title",
    "issuer",
    "certificateUrl",
    "certificateId",
    "issueYear",
    "expiryYear",
  ],
  settings: ["status", "order"],
};

function RouteComponent() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { certificateId } = Route.useParams();
  const { data: certificate } = useSuspenseQuery(
    trpc.certification.getById.queryOptions({ id: certificateId }),
  );

  const updateMutation = useMutation(
    trpc.certification.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.certification.getForDashboard.queryFilter(),
        );
        globalSuccessToast("Certificate updated successfully!");
        router.history.back();
      },
      onError: (err) => globalErrorToast(err.message),
    }),
  );

  const form = useForm({
    validators: { onSubmit: updateCertificationSchema },
    defaultValues: {
      id: certificate.id,
      title: certificate.title,
      issuer: certificate.issuer,
      certificateUrl: certificate.certificateUrl ?? undefined,
      certificateId: certificate.certificateId ?? undefined,
      issueYear: certificate.issueYear
        ? new Date(certificate.issueYear, 0, 1)
        : new Date(),
      expiryYear: certificate.expiryYear
        ? new Date(certificate.expiryYear, 0, 1)
        : undefined,
      status: certificate.status,
      order: certificate.order,
    },
    onSubmit: async ({ value }) => {
      await updateMutation.mutateAsync(value);
    },
  });

  return (
    <div className="flex min-h-[calc(100svh-var(--header-height)-2rem)] flex-1 flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-bold text-foreground">Edit Certificate</h2>
        <p className="text-xs text-muted-foreground">
          Update your certificate details.
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
          <Tabs defaultValue="details" className="min-h-0 flex-1 gap-0">
            <div className="shrink-0 px-4 pt-4 pb-2">
              <form.Subscribe
                selector={(state) => state.fieldMeta}
                children={(fieldMeta) => (
                  <TabsList variant="line">
                    {TAB_TRIGGERS.map((tab) => {
                      const hasError = hasTabError(
                        fieldMeta as Record<string, { errors: Array<unknown> }>,
                        TAB_FIELDS[tab.value] ?? [],
                      );
                      return (
                        <TabsTrigger key={tab.value} value={tab.value}>
                          <tab.icon />
                          {tab.title}
                          {hasError && (
                            <span className="size-1.5 rounded-full bg-destructive" />
                          )}
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                )}
              />
            </div>

            <ScrollArea className="min-h-0 flex-1">
              <div className="p-4">
                <TabsContent value="details">
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
                              placeholder="e.g. AWS Certified Developer"
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />

                    <form.Field
                      name="issuer"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field
                            data-invalid={isInvalid}
                            className="flex flex-col gap-1.5"
                          >
                            <FieldLabel htmlFor={field.name}>Issuer</FieldLabel>
                            <Input
                              id={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              aria-invalid={isInvalid}
                              placeholder="e.g. Amazon Web Services"
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <form.Field
                        name="issueYear"
                        children={(field) => {
                          const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                          return (
                            <Field
                              data-invalid={isInvalid}
                              className="flex flex-col gap-1.5"
                            >
                              <FieldLabel>Issue Year</FieldLabel>
                              <DatePicker
                                value={
                                  field.state.value
                                    ? new Date(field.state.value).getTime()
                                    : undefined
                                }
                                onChange={(value) =>
                                  field.handleChange(new Date(value))
                                }
                                placeholder="Select issue year"
                              />
                              {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                              )}
                            </Field>
                          );
                        }}
                      />

                      <form.Field
                        name="expiryYear"
                        children={(field) => {
                          const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                          return (
                            <Field
                              data-invalid={isInvalid}
                              className="flex flex-col gap-1.5"
                            >
                              <FieldLabel>Expiry Year</FieldLabel>
                              <DatePicker
                                value={
                                  field.state.value
                                    ? new Date(field.state.value).getTime()
                                    : undefined
                                }
                                onChange={(value) =>
                                  field.handleChange(new Date(value))
                                }
                                placeholder="Select expiry year (optional)"
                              />
                              {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                              )}
                            </Field>
                          );
                        }}
                      />
                    </div>

                    <form.Field
                      name="certificateUrl"
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
                              Certificate URL
                            </FieldLabel>
                            <Input
                              id={field.name}
                              value={field.state.value ?? ""}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(
                                  e.target.value || undefined,
                                )
                              }
                              aria-invalid={isInvalid}
                              placeholder="https://..."
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />

                    <form.Field
                      name="certificateId"
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
                              Certificate ID
                            </FieldLabel>
                            <Input
                              id={field.name}
                              value={field.state.value ?? ""}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(
                                  e.target.value || undefined,
                                )
                              }
                              aria-invalid={isInvalid}
                              placeholder="e.g. ABC-123-XYZ"
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
                              {EXPERIENCE_STATUS_TYPES.map((status) => (
                                <ToggleGroupItem
                                  key={status}
                                  value={status}
                                  aria-label={status}
                                >
                                  {EXPERIENCE_STATUS_LABELS[status]}
                                </ToggleGroupItem>
                              ))}
                            </ToggleGroup>
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
