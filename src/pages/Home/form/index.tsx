import "./form.css";
import { useHomeForm } from "../../../hooks/useFormHors";
import {
  DadosBanco,
  DateForm,
  Day,
  Month,
} from "../../../components/types/HomeTypes";
import { months } from "../../../constants/months";
import { calcularHoras } from "../../../functions/CalculoHors";
import { FaDeleteLeft } from "react-icons/fa6";
import { useState } from "react";

export function FormHors({ dadosBanco, setDadosBanco }: any) {
  const { register, handleSubmit, errors, reset } = useHomeForm();

  const [existDate, setExistDate] = useState<boolean>(false);

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
          setExistDate(true);
          setTimeout(() => {
            setExistDate(false);
          }, 3000);

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
        <p>Data</p>
        <input type="date" placeholder="18/20/16" {...register("date")} />
        {errors.date && <p className="error">{errors.date.message}</p>}
        {existDate && <p className="error">data já utilizada</p>}
      </label>
      <label>
        <p> Início</p>
        <input type="time" {...register("start")} />
        {errors.start && <p className="error">{errors.start.message}</p>}
      </label>
      <label>
        <p> Início do intervalo</p>
        <input type="time" {...register("startInterval")} />
        {errors.startInterval && (
          <p className="error">{errors.startInterval.message}</p>
        )}
      </label>
      <label>
        <p>Fim do intervalo</p>
        <input type="time" {...register("endInterval")} />
        {errors.endInterval && (
          <p className="error">{errors.endInterval.message}</p>
        )}
      </label>
      <label>
        <p>Fim</p>
        <input type="time" {...register("end")} />
        {errors.end && <p className="error">{errors.end.message}</p>}
      </label>
      <button type="button" onClick={() => reset()}>
        <FaDeleteLeft />
      </button>
      <button type="submit">+</button>
    </form>
  );
}
