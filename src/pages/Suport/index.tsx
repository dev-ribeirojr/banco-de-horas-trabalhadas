import { useContext, useState } from "react";
import "./suport.css";

import { AuthContext } from "../../contexts/auth";

import Logo from "../../assets/logo-banco.png";

import { MdEmail } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useSuportForm } from "../../hooks/useSuportForm";
import { handleSendText } from "../../functions/HandleSendMessage";
import { LoadingCircle } from "../../components/loading";

import { Text } from "../../components/types/SuportTypes";
import StatusText from "../../components/StatusMessage";

export default function Suport() {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset, errors } = useSuportForm();

  const [loading, setLoading] = useState<boolean>(false);
  const [messageStatus, setMessageStatus] = useState<string>("");

  const navigate = useNavigate();

  function onSubmit({ text }: Text) {
    setLoading(true);
    const props = {
      text: text,
      email: user?.email,
      name: user?.name,
      setLoading: setLoading,
      setMessageStatus: setMessageStatus,
      reset: reset,
    };
    handleSendText(props);
  }

  return (
    <section className="container suport">
      <img src={Logo} alt="imagen da logo" width={120} className="logo" />
      <h1>Fale Conosco!</h1>

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
        <textarea placeholder="Digite sua mensagem" {...register("text")} />
        {messageStatus !== "" && <StatusText>{messageStatus}</StatusText>}
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
          <button type="submit">
            {loading ? <LoadingCircle /> : "ENVIAR"}
          </button>
        </div>
      </form>
    </section>
  );
}
