import "./edit.css";
import { useRef, useContext } from "react";
import { MdEdit } from "react-icons/md";
import { AuthContext } from "../../../contexts/auth";
import { handleDeleteDay } from "../../../functions/HandleDeleteDay";

export function Edit({ dataDay }: any) {
  const { dadosBanco, setDadosBanco, storageUser, user, setUser } =
    useContext(AuthContext);
  const { day, month, year, setDataDay, setSave } = dataDay;
  const containerRef: any = useRef();

  function handleClose(e: any) {
    if (e.target == containerRef.current) {
      setDataDay(null);
    }
  }

  function handleDelete() {
    const props = {
      day,
      month,
      year,
      setDataDay,
      dadosBanco,
      user,
      setDadosBanco,
      storageUser,
      setUser,
      setSave,
    };
    handleDeleteDay(props);
  }

  return (
    <div
      className="edit-container container"
      ref={containerRef}
      onClick={(e) => handleClose(e)}
    >
      <section className="area-edit">
        <h1 className="title">Editando...</h1>
        <form className="form-add">
          <label>
            <p>Data</p>
            <input type="date" value={day.date} disabled />
          </label>
          <label>
            <p> Início</p>
            <input type="time" value={day.start} disabled />
          </label>
          <label>
            <p> Início do intervalo</p>
            <input type="time" value={day.startInterval} disabled />
          </label>
          <label>
            <p>Fim do intervalo</p>
            <input type="time" value={day.endInterval} disabled />
          </label>
          <label>
            <p>Fim</p>
            <input type="time" value={day.end} disabled />
          </label>
          <button type="submit">
            <MdEdit />
          </button>
        </form>
        <section className="area-btn-form-edit">
          <button onClick={() => setDataDay(null)}>CANCELAR</button>
          <button onClick={handleDelete}>EXCLUIR</button>
        </section>
      </section>
    </div>
  );
}
