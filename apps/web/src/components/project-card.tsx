import { trpc } from "@/utils/trpc";
import type {ProjectWithViewCount} from "@portofolio/types/project.types";
import { toCompactNumber } from "@portofolio/utils/number";
import {
  IconBrandAppstore,
  IconBrandGithub,
  IconBrandGooglePlay,
  IconExternalLink,
  IconEye,
} from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Separator } from "./ui/separator";

interface ProjectCardProps {
  project: ProjectWithViewCount;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();
  const incrementViews = useMutation(trpc.project.updateView.mutationOptions());

  return (
    <Card
      className="flex flex-col h-full rounded-lg p-5 max-w-md cursor-pointer border border-transparent transition-all hover:bg-project-hover hover:border-card-hover-border hover:shadow-sm"
      onClick={() => navigate({ to: '/projects/$slug', params: { slug: project.slug } })}
    >
      <CardContent className="flex flex-col gap-4 p-0 flex-1">
        <h3 className="text-sm font-semibold">{project.title}</h3>
        <p className="text-xs text-muted-foreground">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, index) => (
            <span
              key={index}
              className="text-[10px] bg-tag text-tag-foreground border-tag-border border px-2 py-1 rounded font-mono font-semibold"
            >
              {tech}
            </span>
          ))}
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="p-0 flex items-center justify-between">
        <div className="flex gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => { e.stopPropagation(); incrementViews.mutate({ projectId: project.id }); }}
              className="group text-subtle text-[11px] font-mono inline-flex items-center gap-1.25 transition-all hover:brightness-80"
            >
              <IconBrandGithub className="size-3.25" />
              Github
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => { e.stopPropagation(); incrementViews.mutate({ projectId: project.id }); }}
              className="group text-subtle text-[11px] font-mono inline-flex items-center gap-1.25 transition-all hover:brightness-80"
            >
              <IconExternalLink className="size-3.25" />
              Live
            </a>
          )}
          {project.playstoreUrl && (
            <a
              href={project.playstoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => { e.stopPropagation(); incrementViews.mutate({ projectId: project.id }); }}
              className="group text-subtle text-[11px] font-mono inline-flex items-center gap-1.25 transition-all hover:brightness-80"
            >
              <IconBrandGooglePlay className="size-3.25" />
              Play Store
            </a>
          )}
          {project.appstoreUrl && (
            <a
              href={project.appstoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => { e.stopPropagation(); incrementViews.mutate({ projectId: project.id }); }}
              className="group text-subtle text-[11px] font-mono inline-flex items-center gap-1.25 transition-all hover:brightness-80"
            >
              <IconBrandAppstore className="size-3.25" />
              App Store
            </a>
          )}
        </div>
        <span className="text-subtle text-[11px] font-mono inline-flex items-center gap-1.25">
          <IconEye className="size-3.25" />
          {toCompactNumber(Number(project.viewCount) || 0)}
        </span>
      </CardFooter>
    </Card>
  );
}
