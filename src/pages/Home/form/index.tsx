import "./form.css";
import { HomeForm } from "../../../hooks/FormHors";
import {
  DadosBanco,
  DateForm,
  Day,
  Month,
} from "../../../components/types/HomeTypes";
import { months } from "../../../constants/months";
import { calcularHoras } from "../../../functions/CalculoHors";

export function FormHors({ dadosBanco, setDadosBanco }: any) {
  const { register, handleSubmit, errors } = HomeForm();

  function handleHoras(
    start: string,
    startInterval: string,
    endInterval: string,
    end: string
  ) {
    let fullDay = calcularHoras(start, end);
    let interval = calcularHoras(startInterval, endInterval);
    let hors = calcularHoras(interval, fullDay);
    return hors;
  }

  function handleAdd({
    date,
    start,
    startInterval,
    endInterval,
    end,
  }: DateForm) {
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
      total: handleHoras(start, startInterval, endInterval, end),
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
          return;
        }
        // dia não cadastrado ainda
        dadosBanco[indexYear].months[indexMonth].days.push(day);
      } else {
        //mes não cadastrado
        dadosBanco[indexYear].months.push(month);
      }
    } else {
      // ano não cadastrado ainda
      dadosBanco.push({
        year: yearAdd,
        months: [month],
      });
    }

    setDadosBanco([...list]);
  }

  return (
    <form onSubmit={handleSubmit(handleAdd)} className="form-add">
      <label>
        Data
        <input type="date" placeholder="18/20/16" {...register("date")} />
        {errors.date && <p>X</p>}
      </label>
      <label>
        Início
        <input type="time" {...register("start")} />
        {errors.start && <p>X</p>}
      </label>
      <label>
        Início do intervalo
        <input type="time" {...register("startInterval")} />
        {errors.startInterval && <p>X</p>}
      </label>
      <label>
        Fim do intervalo
        <input type="time" {...register("endInterval")} />
        {errors.endInterval && <p>X</p>}
      </label>
      <label>
        Fim
        <input type="time" {...register("end")} />
        {errors.end && <p>X</p>}
      </label>
      <button type="submit">+</button>
    </form>
  );
}
