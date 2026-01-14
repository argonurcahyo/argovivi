import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export function getTime(tz: string) {
  return dayjs().tz(tz);
}

export function timeStatus(hour: number) {
  if (hour < 6) return "Lagi tidur 😴";
  if (hour < 12) return "Pagi ☀️";
  if (hour < 18) return "Siang 🌤️";
  return "Malam 🌙";
}

export function diffHour(tzA: string, tzB: string) {
  const a = dayjs().tz(tzA).utcOffset();
  const b = dayjs().tz(tzB).utcOffset();
  return (b - a) / 60;
}
