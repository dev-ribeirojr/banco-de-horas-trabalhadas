import { useState, useContext } from "react";
import "./form.css";
import { useHomeForm } from "../../../hooks/useFormHors";
import { FaDeleteLeft } from "react-icons/fa6";
import { DataForm, FormHoursProp } from "../../../components/types/HomeTypes";
import { handleAdd } from "../../../functions/HandleAddData";
import { AuthContext } from "../../../contexts/auth";

export function FormHors({ setSave }: FormHoursProp) {
  const { register, handleSubmit, errors, reset } = useHomeForm();
  const { user, setUser, storageUser, setDadosBanco, dadosBanco } =
    useContext(AuthContext);

  const [existDate, setExistDate] = useState<boolean>(false);

  function onSubmit(data: DataForm) {
    const dados = {
      data,
      dadosBanco,
      setDadosBanco,
      setExistDate,
      user,
      setUser,
      storageUser,
      setSave,
    };
    handleAdd(dados);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-add">
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
