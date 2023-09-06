import { useState } from "react";
import "./recoverPassword.css";

import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";

import { auth } from "../../services/firebaseConection";
import { sendPasswordResetEmail } from "firebase/auth";

import { LoadingCircle } from "../../components/loading";
import { FormProps } from "../../components/types/RecoverTypes";
import { RecoverPasswordForm } from "../../hooks/RecoverPasswordForm";

export default function RecoverPassword() {
  const [loading, setLoading] = useState<boolean>(false);
  const [recoverStatus, setRecoverStatus] = useState<boolean>(false);
  const [classStatus, setClassStatus] = useState<string>("info-sucess");
  const [messageStatus, setMessageStatus] = useState<string>(
    "Link de recuperação enviado!"
  );

  const { register, handleSubmit, errors } = RecoverPasswordForm();

  function handleRecoverStatus() {
    setRecoverStatus(true);
    setTimeout(() => {
      setRecoverStatus(false);
    }, 5000);
  }

  async function handleForm(data: FormProps) {
    setLoading(true);
    await sendPasswordResetEmail(auth, data.email)
      .then(() => {
        setLoading(false);
        setClassStatus("info-sucess");
        setMessageStatus("Link de recuperação enviado!");
        handleRecoverStatus();
      })
      .catch((er) => {
        setClassStatus("info-error");
        //usuário não cadastrado
        if (er.code === "auth/user-not-found") {
          setMessageStatus("Este email não existe em nosso sistema!");
          handleRecoverStatus();
          setLoading(false);
          return;
        }
        setMessageStatus("Error ao enviar o link!");
        handleRecoverStatus();
        setLoading(false);
        console.log(er);
      });
  }

  return (
    <section className="container">
      <section className="login recover">
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
          onSubmit={handleSubmit(handleForm)}
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
