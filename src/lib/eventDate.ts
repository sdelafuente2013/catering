const DEFAULT_TIME_ZONE = "America/Argentina/Buenos_Aires";

function getTimeZoneDateParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  return {
    year: Number(parts.find((part) => part.type === "year")?.value ?? "0"),
    month: Number(parts.find((part) => part.type === "month")?.value ?? "1"),
    day: Number(parts.find((part) => part.type === "day")?.value ?? "1"),
  };
}

export function getMinEventDateInputValue(
  offsetDays: number,
  timeZone = DEFAULT_TIME_ZONE
): string {
  const today = getTimeZoneDateParts(new Date(), timeZone);
  const baseDate = new Date(
    Date.UTC(today.year, today.month - 1, today.day + offsetDays)
  );

  return baseDate.toISOString().slice(0, 10);
}
