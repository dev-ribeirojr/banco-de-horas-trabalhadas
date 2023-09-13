import { useContext, useState } from "react";
import "./table.css";
import { format, parseISO } from "date-fns";

import {
  Year,
  Day,
  Month,
  Save,
  DataDay,
} from "../../../components/types/HomeTypes";

import { MdEdit } from "react-icons/md";
import { Edit } from "../edit";

import { calculateHoursOfTheMonth } from "../../../functions/CalculateHoursOfTheMonth";
import { AuthContext } from "../../../contexts/auth";

export function Table({ setSave }: Save) {
  const { dadosBanco } = useContext(AuthContext);
  const [dataDay, setDataDay] = useState<any | null>(null);

  // organizando a renderização das tabelas por ano, mes é dia
  dadosBanco?.sort((a: Year, b: Year) => Number(b.year) - Number(a.year));
  dadosBanco?.map((doc: Year) =>
    doc.months.sort((a: Month, b: Month) => Number(b.id) - Number(a.id))
  );

  dadosBanco?.map((doc: Year) =>
    doc.months.map((month: Month) =>
      month.days.sort(
        (a: Day, b: Day) =>
          Number(a.date.replaceAll("-", "")) -
          Number(b.date.replaceAll("-", ""))
      )
    )
  );

  function handleEdit(day: Day, month: string, year: string) {
    setDataDay({ day, month, year });
  }

  return (
    <section>
      {dataDay !== null && (
        <Edit data={dataDay} setDataDay={setDataDay} setSave={setSave} />
      )}
      {dadosBanco?.map((doc: Year) => (
        <section key={doc?.year} className="area-table">
          <h1>Ano / "{doc?.year}"</h1>

          {doc?.months.map((month) => (
            <table key={month?.id} className="table">
              <thead>
                <tr className="trtitle">
                  <th colSpan={7}>{month?.month}</th>
                </tr>
                <tr>
                  <th>data</th>
                  <th>início</th>
                  <th>intervalo de</th>
                  <th>intervalo até</th>
                  <th>fim</th>
                  <th>horas</th>
                  <th className="edit"></th>
                </tr>
              </thead>
              <tbody>
                {month.days.map((day) => (
                  <tr key={day.date}>
                    <td>{format(parseISO(day?.date), "dd/MM/yyyy")}</td>
                    <td>{day.start}</td>
                    <td className="td-interval">{day.startInterval}</td>
                    <td className="td-interval">{day.endInterval}</td>
                    <td>{day.end}</td>
                    <td>{day.total}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(day, month.id, doc.year)}
                      >
                        <MdEdit />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={4}></td>
                  <td>total</td>
                  <td>{calculateHoursOfTheMonth(month.days)}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          ))}
        </section>
      ))}
    </section>
  );
}
