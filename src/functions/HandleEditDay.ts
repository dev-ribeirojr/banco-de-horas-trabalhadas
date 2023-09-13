import {
  HandleEditDayProps,
  Month,
  Year,
  Day,
} from "../components/types/HomeTypes";
import { handleTimeOfDay } from "./HandleSomaHours";

export function handleEditDay({
  data,
  day,
  month,
  year,

  setDataDay,

  dadosBanco,
  setDadosBanco,

  user,
  setUser,
  storageUser,

  setSave,
}: HandleEditDayProps) {
  const { startEdit, startIntervalEdit, endIntervalEdit, endEdit } = data;

  const dayNewValue = {
    date: day.date,
    start: startEdit,
    startInterval: startIntervalEdit,
    endInterval: endIntervalEdit,
    end: endEdit,
    total: handleTimeOfDay(
      startEdit,
      startIntervalEdit,
      endIntervalEdit,
      endEdit
    ),
  };

  const userData = user!;
  const dados = dadosBanco;

  const indexYear = dados.findIndex((ano: Year) => ano.year === year);
  const indexMonth = dados[indexYear].months.findIndex(
    (mes: Month) => mes.id === month
  );
  const indexDay = dados[indexYear].months[indexMonth].days.findIndex(
    (dia: Day) => dia.date === day.date
  );
  dados[indexYear].months[indexMonth].days[indexDay] = dayNewValue;

  if (userData) {
    userData.banco! = dados;
    userData.save! = true;

    storageUser(userData);
  }

  setUser(userData);
  setDadosBanco([...dados]);
  setSave(true);
  setDataDay(null);
}
