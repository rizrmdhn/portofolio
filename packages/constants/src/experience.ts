export const EXPERIENCE_TYPES = [
  "internship",
  "full-time",
  "freelance",
  "part-time",
  "contract",
  "temporary",
  "volunteer",
] as const;

export type ExperienceType = (typeof EXPERIENCE_TYPES)[number];

export const EXPERIENCE_TYPE_LABELS: Record<ExperienceType, string> = {
  internship: "Internship",
  "full-time": "Full-Time",
  freelance: "Freelance",
  "part-time": "Part-Time",
  contract: "Contract",
  temporary: "Temporary",
  volunteer: "Volunteer",
};

export const EXPERIENCE_TYPE_COLORS: Record<ExperienceType, string> = {
  internship: "#4F46E5", // Indigo
  "full-time": "#16A34A", // Green
  freelance: "#D97706", // Orange
  "part-time": "#DB2777", // Pink
  contract: "#2563EB", // Blue
  temporary: "#9333EA", // Purple
  volunteer: "#059669", // Emerald
};
