import "./table.css";
import { DadosBanco, Day, Month } from "../../../components/types/HomeTypes";
import { MdEdit } from "react-icons/md";

import { format, parseISO } from "date-fns";
import { calculateHoursOfTheMonth } from "../../../functions/CalculateHoursOfTheMonth";

export function Table({ dados }: any) {
  // organizando a renderização das tabelas por ano, mes é dia
  dados.sort((a: DadosBanco, b: DadosBanco) => Number(b.year) - Number(a.year));
  dados.map((doc: DadosBanco) =>
    doc.months.sort((a: Month, b: Month) => Number(b.id) - Number(a.id))
  );

  dados.map((doc: DadosBanco) =>
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
      {dados.map((doc: DadosBanco) => (
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
