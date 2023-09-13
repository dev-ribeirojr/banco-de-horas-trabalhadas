import { useState } from "react";
import "./recoverPassword.css";

import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";

import { LoadingCircle } from "../../components/loading";
import { useRecoverPasswordForm } from "../../hooks/useRecoverPasswordForm";
import Logo from "../../assets/logo-banco.png";
import { handleRecoverPassword } from "../../functions/HandleRecoverPassword";
import { Email } from "../../components/types/UserTypes";

export default function RecoverPassword() {
  const [loading, setLoading] = useState<boolean>(false);
  const [recoverStatus, setRecoverStatus] = useState<boolean>(false);
  const [classStatus, setClassStatus] = useState<string>("info-sucess");
  const [messageStatus, setMessageStatus] = useState<string>(
    "Link de recuperação enviado!"
  );

  const { register, handleSubmit, errors } = useRecoverPasswordForm();

  async function onSubmit(data: Email) {
    const props = {
      data,
      setLoading,
      setRecoverStatus,
      setClassStatus,
      setMessageStatus,
    };
    handleRecoverPassword(props);
  }

  return (
    <section className="container">
      <section className="login recover">
        <img src={Logo} alt="imagen da logo" width={120} className="logo" />
        <h1 className="login-title" style={{ marginBottom: 20 }}>
          Redefinir Senha
        </h1>
        <p
          style={{
            color: "#df4f6e",
            marginBottom: 20,
          }}
        >
          Te enviaremos um link de recuperação em seu email para a alteração da
          senha.
        </p>
        <form
          className="login-form"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <label className="inputText">
            <span>
              <MdEmail size={20} />
            </span>
            <input
              id="name"
              type="text"
              placeholder="Digite seu email..."
              {...register("email")}
            />
          </label>
          {errors.email && <p className="error-text">{errors.email.message}</p>}
          {recoverStatus && (
            <p className={`info-message ${classStatus}`}>{messageStatus}</p>
          )}
          <button type="submit" className="button-submit" disabled={loading}>
            {loading ? <LoadingCircle /> : " Enviar"}
          </button>
          <Link to={"/"} className="button-cancelar">
            Cancelar
          </Link>
        </form>
      </section>

      <div className="bubble bubble-one"></div>
      <div className="bubble bubble-two"></div>
      <div className="bubble bubble-tree"></div>
      <div className="bubble bubble-four"></div>
    </section>
  );
}
