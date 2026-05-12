import { buildSeoMeta } from "@/lib/seo";
import { MainHeader } from "@/components/main-header";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { IconDownload } from "@tabler/icons-react";
import { trpc } from "@/utils/trpc";

export const Route = createFileRoute("/resume")({
  loader: async ({ context }) => {
    const [cv, seo] = await Promise.all([
      context.queryClient.ensureQueryData(context.trpc.resume.get.queryOptions()),
      context.queryClient.ensureQueryData(context.trpc.seo.getPage.queryOptions({ page: "resume" })),
    ]);

    return { cv, seo };
  },
  head: ({ loaderData }) => ({
    meta: buildSeoMeta(loaderData?.seo, {
      title: "Resume",
      description: "View and download my resume / CV.",
    }),
  }),
  component: ResumePage,
});

function ResumePage() {
  const { cv } = Route.useLoaderData();
  const trackDownload = useMutation(trpc.resume.trackDownload.mutationOptions());

  const handleDownload = () => {
    if (!cv?.data.url) return;
    trackDownload.mutate();
    window.open(cv.data.url, "_blank");
  };

  return (
    <div className="flex flex-col bg-background text-foreground min-h-screen">
      <MainHeader />
      <main className="w-full md:max-w-4xl mx-auto px-4 md:px-0 py-12 flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-sm text-subtle tracking-[0.15em] font-mono">
              RESUME
            </h1>
            {cv?.data.uploadedAt && (
              <p className="text-muted-foreground text-xs mt-1">
                Last updated{" "}
                {new Date(cv.data.uploadedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </div>

          {cv?.data.url && (
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <IconDownload className="size-4" />
              Download PDF
            </button>
          )}
        </div>

        {cv?.data.url ? (
          <div
            className="border border-border rounded-lg overflow-hidden"
            style={{ height: "80vh" }}
          >
            <iframe
              src={`${cv.data.url}#toolbar=0`}
              className="w-full h-full"
              title="Resume PDF"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 border border-border rounded-lg">
            <p className="text-muted-foreground text-sm">
              No resume available yet.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
