import { HandleDeleDayProps } from "../components/types/HomeTypes";

export function handleDeleteDay({
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
}: HandleDeleDayProps) {
  const dataUser = user!;
  const data = dadosBanco;
  const indexYear = data.findIndex((ano: any) => ano.year === year);
  const indexMonth = data[indexYear].months.findIndex(
    (mes: any) => mes.id === month
  );
  const indexDay = data[indexYear].months[indexMonth].days.findIndex(
    (dia: any) => dia.date === day.date
  );

  data[indexYear].months[indexMonth].days.splice(indexDay, 1);

  if (data[indexYear].months[indexMonth].days.length < 1) {
    data[indexYear].months.splice(indexMonth, 1);
  }
  if (data[indexYear].months.length < 1) {
    data.splice(indexYear, 1);
  }

  dataUser.banco = data;
  dataUser.save = true;

  storageUser(dataUser);
  setUser(dataUser);
  setSave(true);
  setDadosBanco(data);
  setDataDay(null);
}
