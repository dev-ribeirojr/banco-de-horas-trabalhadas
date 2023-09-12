import "./table.css";
import { Year, Day, Month } from "../../../components/types/HomeTypes";
import { MdEdit } from "react-icons/md";

import { format, parseISO } from "date-fns";
import { calculateHoursOfTheMonth } from "../../../functions/CalculateHoursOfTheMonth";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/auth";

export function Table() {
  const { dadosBanco } = useContext(AuthContext);

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

  return (
    <section>
      {dadosBanco?.map((doc: Year) => (
        <section key={doc.year} className="area-table">
          <h1>Ano / "{doc.year}"</h1>

          {doc.months.map((month) => (
            <table key={month.id} className="table">
              <thead>
                <tr className="trtitle">
                  <th colSpan={7}>{month.month}</th>
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
                    <td>{format(parseISO(day.date), "dd/MM/yyyy")}</td>
                    <td>{day.start}</td>
                    <td className="td-interval">{day.startInterval}</td>
                    <td className="td-interval">{day.endInterval}</td>
                    <td>{day.end}</td>
                    <td>{day.total}</td>
                    <td>
                      <button>
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
