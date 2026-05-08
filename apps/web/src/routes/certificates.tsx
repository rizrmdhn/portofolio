import { CertificateCard } from "@/components/certificate-card";
import { MainHeader } from "@/components/main-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/certificates")({
  loader: async ({ context }) => {
    const certifications = await context.queryClient.ensureQueryData(
      context.trpc.certification.getAll.queryOptions(),
    );

    return { certifications };
  },
  component: CertificatesPage,
});

function CertificatesPage() {
  const { certifications } = Route.useLoaderData();

  return (
    <div className="flex flex-col bg-background text-foreground">
      <MainHeader />
      <main className="w-full md:max-w-175 mx-auto px-4 md:px-0 py-12 flex flex-col gap-8">
        <h1 className="text-sm text-subtle tracking-[0.15em] font-mono">
          ALL CERTIFICATIONS
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] gap-3">
          {certifications.map((certification) => (
            <CertificateCard
              key={certification.id}
              certificate={certification}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
