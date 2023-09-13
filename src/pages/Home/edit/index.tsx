import { useRef, useContext } from "react";
import "./edit.css";

import { MdEdit } from "react-icons/md";
import { AuthContext } from "../../../contexts/auth";
import { handleDeleteDay } from "../../../functions/HandleDeleteDay";
import { handleEditDay } from "../../../functions/HandleEditDay";
import { useEditDayForm } from "../../../hooks/useEditDayForm";
import { DataDay, DataFormEdit } from "../../../components/types/HomeTypes";

export function Edit({ day, month, year, setDataDay, setSave }: DataDay) {
  const { register, handleSubmit } = useEditDayForm({
    date: day.date,
    start: day.start,
    startInterval: day.startInterval,
    endInterval: day.endInterval,
    end: day.end,
  });

  const { dadosBanco, setDadosBanco, storageUser, user, setUser } =
    useContext(AuthContext);

  const containerRef: any = useRef();

  function handleClose(e: any) {
    if (e.target == containerRef.current) {
      setDataDay(null);
    }
  }

  const props = {
    day,
    month,
    year,
    dadosBanco,
    user,
    setDadosBanco,
    storageUser,
    setUser,
    setDataDay,
    setSave,
  };

  function onSubmit(data: DataFormEdit) {
    handleEditDay({ data, ...props });
  }

  function handleDelete() {
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
        <form className="form-add" onSubmit={handleSubmit(onSubmit)}>
          <label>
            <p>Data</p>
            <input type="date" disabled {...register("dateEdit")} />
          </label>
          <label>
            <p> Início</p>
            <input type="time" {...register("startEdit")} />
          </label>
          <label>
            <p> Início do intervalo</p>
            <input type="time" {...register("startIntervalEdit")} />
          </label>
          <label>
            <p>Fim do intervalo</p>
            <input type="time" {...register("endIntervalEdit")} />
          </label>
          <label>
            <p>Fim</p>
            <input type="time" {...register("endEdit")} />
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
