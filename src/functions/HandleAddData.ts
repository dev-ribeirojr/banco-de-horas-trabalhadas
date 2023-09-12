import {
  DadosBanco,
  Month,
  Day,
  HandleAddProp,
} from "../components/types/HomeTypes";
import { months } from "../constants/months";
import { handleTimeOfDay } from "./HandleSomaHours";

export function handleAdd({
  data,
  dadosBanco,
  setDadosBanco,
  setExistDate,
}: HandleAddProp) {
  const { date, start, startInterval, endInterval, end } = data;
  const monthNumber = Number(date.slice(5, 7));
  const monthName = months[monthNumber - 1];
  const yearAdd = date.slice(0, 4);

  const list = dadosBanco;

  const day: Day = {
    date,
    start,
    startInterval,
    endInterval,
    end,
    total: handleTimeOfDay(start, startInterval, endInterval, end),
  };
  const month: Month = {
    id: String(monthNumber),
    month: monthName,
    days: [day],
  };

  const existYear = dadosBanco.findIndex(
    (doc: DadosBanco) => doc.year === yearAdd
  );
  if (existYear !== -1) {
    // ano cadastrado
    const indexYear = existYear;
    const months = dadosBanco[existYear].months;
    const existMonth = months.findIndex(
      (item: Month) => item.month === monthName
    );

    if (existMonth !== -1) {
      //mes ja cadatrado
      const indexMonth = existMonth;
      const days = dadosBanco[indexYear].months[indexMonth].days;
      const existDay = days.findIndex((day: Day) => day.date === date);

      if (existDay !== -1) {
        // dia ja cadastrado apenas informar
        setExistDate(true);
        setTimeout(() => {
          setExistDate(false);
        }, 3000);

        return;
      }
      // dia não cadastrado ainda
      list[indexYear].months[indexMonth].days.push(day);
    } else {
      //mes não cadastrado
      list[indexYear].months.push(month);
    }
  } else {
    // ano não cadastrado ainda
    list.push({
      year: yearAdd,
      months: [month],
    });
  }

  setDadosBanco([...list]);
}
