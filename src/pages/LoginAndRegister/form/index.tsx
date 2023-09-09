import { useContext } from "react";

import { MdEmail, MdLock } from "react-icons/md";

import { AuthContext } from "../../../contexts/auth";
import { LoadingCircle } from "../../../components/loading";

// remover quando componentizar os inputs
import "../../../components/Input/input.css";

import { UserSignInProps } from "../../../components/types/AuthType";
import { useLoginForm } from "../../../hooks/useLoginForm";
import StatusText from "../../../components/StatusMessage";

export function FormLogin() {
  const { signIn, loadingLogin, statusMessage } = useContext(AuthContext);
  const { register, handleSubmit, errors } = useLoginForm();

  async function handleSubmitForm(data: UserSignInProps) {
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
