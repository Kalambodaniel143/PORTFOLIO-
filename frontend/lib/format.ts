/** "2024-09" -> "Sep 2024". Accepts "YYYY-MM" or "YYYY-MM-DD". */
export function formatMonth(value: string | null): string {
  if (!value) return "Present";
  const [year, month] = value.split("-");
  const date = new Date(Number(year), Number(month ?? "1") - 1, 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function formatRange(start: string, end: string | null): string {
  return `${formatMonth(start)} — ${formatMonth(end)}`;
}
