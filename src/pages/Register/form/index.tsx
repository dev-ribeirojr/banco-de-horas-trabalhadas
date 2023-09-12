import { useContext, useEffect } from "react";

import { MdEmail, MdLock } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

import { AuthContext } from "../../../contexts/auth";
import { LoadingCircle } from "../../../components/loading";

// remover quando componentizar os inputs
import "../../../components/Input/input.css";
import { useRegisterForm } from "../../../hooks/useRegisterForm";
import { UserSignUp } from "../../../components/types/UserTypes";

export function FormRegister() {
  const { signUp, loadingLogin, statusMessage, setStatusMessage } =
    useContext(AuthContext);
  const { register, handleSubmit, errors } = useRegisterForm();

  useEffect(() => {
    setStatusMessage("");
  }, []);

  async function handleSubmitForm(data: UserSignUp) {
    signUp(data);
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="login-form"
      autoComplete="off"
    >
      <label className="inputText">
        <span>
          <FaUserAlt size={20} />
        </span>
        <input
          id="name"
          type="text"
          placeholder="Digite seu nome..."
          {...register("name")}
        />
      </label>
      {errors.name && <p className="error-text">{errors.name.message}</p>}
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
        <p className="info-message info-error">{statusMessage}</p>
      )}

      <button type="submit" className="button-submit" disabled={loadingLogin}>
        {loadingLogin ? <LoadingCircle /> : "Cadastrar"}
      </button>
    </form>
  );
}
