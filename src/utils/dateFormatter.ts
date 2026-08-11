import { parseISO, isValid, format } from "date-fns";

export function formatDate(value: string | number | Date | undefined): string {
  if (value == null) return "";
  const date = typeof value === "string" ? parseISO(value) : new Date(value);
  return isValid(date) ? format(date, "dd/MM/yyyy, HH:mm:ss") : "";
}