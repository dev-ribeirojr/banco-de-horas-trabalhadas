import "./table.css";
import { DadosBanco, Day, Month } from "../../../components/types/HomeTypes";
import { MdEdit } from "react-icons/md";

export function Table({ dados }: any) {
  dados.sort((a: DadosBanco, b: DadosBanco) => Number(a.year) - Number(b.year));
  dados.map((doc: DadosBanco) =>
    doc.months.sort((a: Month, b: Month) => Number(a.id) - Number(b.id))
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
          <h1>Ano "{doc.year}"</h1>

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
                    <td>{day.date}</td>
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
                  <td>horas</td>
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
