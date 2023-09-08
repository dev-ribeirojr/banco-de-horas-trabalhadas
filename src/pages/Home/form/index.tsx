import { useState } from "react";
import "./form.css";
import { DateForm } from "../../../components/types/HomeTypes";
import { HomeForm } from "../../../hooks/FormHors";

export function FormHors({ setDadosBanco, dadosBanco }: any) {
  const { register, handleSubmit, errors } = HomeForm();
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  function handleAdd({
    date,
    start,
    startInterval,
    endInterval,
    end,
  }: DateForm) {
    const monthNumber = Number(date.slice(5, 7));
    const monthName = months[monthNumber - 1];
    const year = date.slice(0, 4);

    const fullDataBanco = dadosBanco;

    const day = {
      date,
      start,
      startInterval,
      endInterval,
      end,
      total: "total",
    };
    const month = {
      id: monthNumber,
      month: monthName,
      days: [day],
    };
    const existYear = fullDataBanco.findIndex(
      (data: any) => data.year === year
    );

    if (existYear !== -1) {
      // ano cadastrado
      const indexYear = existYear;
      const months = fullDataBanco[existYear].months;
      const existMonth = months.findIndex(
        (item: any) => item.month === monthName
      );
      if (existMonth !== -1) {
        //mes ja cadatrado
        const indexMonth = existMonth;
        const days = fullDataBanco[indexYear].months[indexMonth].days;
        const existDay = days.findIndex((day: any) => day.date === date);

        if (existDay !== -1) {
          // dia ja cadastrado apenas informar
          return;
        }
        // dia não cadastrado ainda
        fullDataBanco[indexYear].months[indexMonth].days.push(day);
      } else {
        //mes não cadastrado
        fullDataBanco[indexYear].months.push(month);
      }
    } else {
      fullDataBanco.push({
        year,
        months: [month],
      });
    }
    // ano não cadastrado ainda

    setDadosBanco(fullDataBanco);
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
      <label>
        Total
        <input type="text" placeholder="08:00" disabled />
      </label>
      <button type="submit">+</button>
    </form>
  );
}
