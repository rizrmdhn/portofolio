import { AuthHeader } from "@/components/auth-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { globalErrorToast, globalSuccessToast } from "@/lib/toasts";
import { loginSchema } from "@portofolio/schema/auth.schema";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/(auth)/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const [type, setType] = useState<"text" | "password">("password");

  const form = useForm({
    validators: {
      onSubmit: loginSchema,
    },
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: () => {
            navigate({
              to: "/dashboard",
            });
            globalSuccessToast("Logged in successfully");
          },
          onError: (error) => {
            globalErrorToast(error.error.message || "Failed to log in");
          },
        },
      );
    },
  });

  return (
    <div className="flex flex-col bg-background h-dvh">
      <AuthHeader />
      <div className="flex flex-1 flex-col items-center justify-center gap-6 w-full">
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-xl font-bold">Welcome Back</h1>
        </div>
        <Card className="w-full max-w-md">
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="grid gap-2"
            >
              <FieldGroup className="gap-4">
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
                          placeholder="Login button not working on mobile"
                          autoComplete="off"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="password"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field
                        data-invalid={isInvalid}
                        className="flex flex-col gap-1.5"
                      >
                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                        <div className="relative">
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) =>
                              field.handleChange(e.target.value)
                            }
                            aria-invalid={isInvalid}
                            placeholder="Input your password"
                            type={type}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute top-0 right-0 h-full px-3 py-2"
                            onClick={() => {
                              setType((prev) =>
                                prev === "password" ? "text" : "password",
                              );
                            }}
                            aria-label={
                              type === "password"
                                ? "Show password"
                                : "Hide password"
                            }
                          >
                            {type === "password" ? (
                              <IconEyeOff className="h-4 w-4" />
                            ) : (
                              <IconEye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>

                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />

                <form.Subscribe
                  selector={(state) => state.isSubmitting}
                  children={(isSubmitting) => (
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? <Spinner /> : null}
                      Sign In
                    </Button>
                  )}
                />
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
