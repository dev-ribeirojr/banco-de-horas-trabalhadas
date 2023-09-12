import { calculateHoursOfTheDay } from "./CalculateHoursOfTheDay";

export function handleTimeOfDay(
  start: string,
  startInterval: string,
  endInterval: string,
  end: string
) {
  const fullDay = calculateHoursOfTheDay(start, end);
  const interval = calculateHoursOfTheDay(startInterval, endInterval);
  const hors = calculateHoursOfTheDay(interval, fullDay);
  return hors;
}
