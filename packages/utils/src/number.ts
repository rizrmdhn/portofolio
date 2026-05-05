const UNITS = [
  { value: 1_000_000_000, suffix: "b" },
  { value: 1_000_000, suffix: "m" },
  { value: 1_000, suffix: "k" },
];

export function toCompactNumber(value: number): string {
  const unit = UNITS.find((u) => Math.abs(value) >= u.value);

  if (!unit) return value.toString();

  const result = value / unit.value;
  const formatted = parseFloat(result.toFixed(3));
  return `${formatted}${unit.suffix}`;
}
