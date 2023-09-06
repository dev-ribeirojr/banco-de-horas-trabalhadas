import { useContext } from "react";
import { useForm } from "react-hook-form";

import { MdEmail, MdLock } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

import { AuthContext } from "../../../contexts/auth";
import { LoadingCircle } from "../../../components/loading";

// remover quando componentizar os inputs
import "../../../components/Input/input.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSignUpProps } from "../../../components/types/AuthType";

const schema = z.object({
  password: z.string().min(6, "Crie um senha com pelomenos 6 digitos"),
  email: z.string().email("Digite um email válido!"),
  name: z.string().nonempty("Digite seu nome"),
});

export function FormRegister() {
  const { signUp, loadingLogin, statusMessage } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUpProps>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
  });

  async function handleSubmitForm(data: UserSignUpProps) {
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
