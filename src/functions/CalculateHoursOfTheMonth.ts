import { Day } from "../components/types/HomeTypes";
export function calculateHoursOfTheMonth(month: Day[]) {
  let hoursTotal = 0;
  let minTotal = 0;

  for (const day of month) {
    let hours = Number(day.total.slice(0, 2));
    let min = Number(day.total.slice(3, 5));

    if (min + minTotal >= 60) {
      hoursTotal += hours + 1;
      minTotal += min - 60;
    } else {
      hoursTotal += hours;
      minTotal += min;
    }
  }

  let resHours = hoursTotal < 10 ? `0${hoursTotal}` : `${hoursTotal}`;
  let resMin = minTotal < 10 ? `0${minTotal}` : `${minTotal}`;

  return `${resHours}:${resMin}`;
}
