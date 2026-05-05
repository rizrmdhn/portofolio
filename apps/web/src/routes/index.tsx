import { MainHeader } from "@/components/main-header";
import { Badge } from "@/components/ui/badge";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="flex flex-col bg-background h-dvh text-foreground">
      <MainHeader />

      <section
        id="about"
        className="flex flex-col items-center justify-center gap-6 w-full py-20 dot-grid"
      >
        <div className="max-w-175 flex flex-col gap-6">
          <Badge
            variant="outline"
            className="py-3 bg-available text-available-foreground"
          >
            {/* the span is just dot green */}
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
            <h1 className="text-sm">Avaliable for opportunities</h1>
          </Badge>
          <h1 className="text-5xl font-bold">Noor Rizki Ramadhan</h1>
          <p className="text-2xl text-start max-w-2xl text-subtle">
            Fullstack Developer
          </p>
          <p className="text-lg text-start max-w-2xl text-subtle">
            I build fast, scalable web applications with clean architecture.
            Focused on developer experience, performance, and shipping things
            that actually work.
          </p>
        </div>
      </section>
    </div>
  );
}
