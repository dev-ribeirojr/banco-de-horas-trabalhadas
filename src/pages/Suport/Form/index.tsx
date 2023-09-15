import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { AuthContext } from "../../../contexts/auth";
import { LoadingCircle } from "../../../components/loading";
import StatusText from "../../../components/StatusMessage";

import { handleSendText } from "../../../functions/HandleSendMessage";
import { useSuportForm } from "../../../hooks/useSuportForm";
import { SendMessage } from "../../../components/types/SuportTypes";

export default function FormSuport() {

  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const { handleSubmit, register, errors, reset } = useSuportForm()
  const [loading, setLoading] = useState<boolean>(false);
  const [messageStatus, setMessageStatus] = useState<string>("");

  function onSubmit(data: SendMessage) {

    setLoading(true);
    const props = {
      text: data.text,
      email: user?.email!,
      name: user?.name!,
      setLoading: setLoading,
      setMessageStatus: setMessageStatus,
      reset: reset,
    };

    handleSendText(props);
  }

  return (
    <form
      className="login-form"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="area-inputs-suport">
        <label className="inputText">
          <span>
            <FaUserAlt size={20} />
          </span>
          <input id="name" type="text" placeholder={user?.name} disabled />
        </label>
        <label className="inputText">
          <span>
            <MdEmail size={20} />
          </span>
          <input id="email" type="text" placeholder={user?.email} disabled />
        </label>
      </div>
      <textarea
        id="text"
        placeholder="Digite sua mensagem"
        {...register("text")}
      />
      {messageStatus !== "" && (
        <StatusText
          statusMessage={messageStatus}
          status={
            messageStatus === "Mensagem enviada com sucesso!"
              ? "info-sucess"
              : "info-error"
          }
        />
      )}
      {errors.text && (
        <p
          className="error-text"
          style={{
            textAlign: "center",
          }}
        >
          Digite uma mensagem!
        </p>
      )}
      <div className="area-buttons">
        <button type="button" onClick={() => navigate("/home")}>
          CANCELAR
        </button>
        <button type="submit">{loading ? <LoadingCircle /> : "ENVIAR"}</button>
      </div>
    </form>
  )
}