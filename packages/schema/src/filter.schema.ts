import { z } from "zod";

export const filterOperators = [
  "eq",
  "ne",
  "lt",
  "lte",
  "gt",
  "gte",
  "ilike",
  "notIlike",
  "isEmpty",
  "isNotEmpty",
  "inArray",
  "notInArray",
  "between",
] as const;

export const filterVariants = [
  "text",
  "number",
  "date",
  "select",
  "multiSelect",
  "boolean",
] as const;

export const filterSchema = z.object({
  id: z.string(),
  value: z.union([z.string(), z.array(z.string())]),
  variant: z.enum(filterVariants),
  operator: z.enum(filterOperators),
  filterId: z.string(),
});

export type FilterSchema = z.infer<typeof filterSchema>;
