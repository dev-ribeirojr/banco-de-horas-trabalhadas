import { useContext, useEffect } from "react";

import { MdEmail, MdLock } from "react-icons/md";

import { AuthContext } from "../../../contexts/auth";
import { LoadingCircle } from "../../../components/loading";

// remover quando componentizar os inputs
import "../../../components/Input/input.css";

import { useLoginForm } from "../../../hooks/useLoginForm";
import StatusText from "../../../components/StatusMessage";
import { UserSignIn } from "../../../components/types/UserTypes";

export function FormLogin() {
  const { signIn, loadingLogin, statusMessage, setStatusMessage } =
    useContext(AuthContext);
  const { register, handleSubmit, errors } = useLoginForm();

  useEffect(() => {
    setStatusMessage("");
  }, []);

  async function handleSubmitForm(data: UserSignIn) {
    signIn(data);
  }
  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="login-form"
      autoComplete="off"
    >
      <label className="inputText">
        <span>
          <MdEmail size={20} />
        </span>
        <input
          id="email"
          type="text"
          placeholder="Digite seu email..."
          {...register("email")}
        />
      </label>
      {errors.email && <p className="error-text">{errors.email.message}</p>}
      <label className="inputText">
        <span>
          <MdLock size={20} />
        </span>
        <input
          id="password"
          type="password"
          placeholder="Digite sua senha..."
          {...register("password")}
        />
      </label>
      {errors.password && (
        <p className="error-text">{errors.password.message}</p>
      )}
      {statusMessage !== "" && (
        <StatusText statusMessage={statusMessage} status="info-error" />
      )}
      <button type="submit" className="button-submit" disabled={loadingLogin}>
        {loadingLogin ? <LoadingCircle /> : "Entrar"}
      </button>
    </form>
  );
}
