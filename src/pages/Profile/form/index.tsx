import { useState, useContext } from "react";
import { LoadingCircle } from "../../../components/loading";
import { PasswordTypes } from "../../../components/types/ProfileTypes";
import { useUpdatePasswordForm } from "../../../hooks/useUpdatePasswordForm";

import StatusText from "../../../components/StatusMessage";
import { handleUpdatePassword } from "../../../functions/HandleUpdatePassword";
import { ClassTypes } from "../../../components/types/ClassTypes";
import { AuthContext } from "../../../contexts/auth";

export function FormEditPassword() {
  const { register, handleSubmit, errors } = useUpdatePasswordForm();
  const { logOut } = useContext(AuthContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [redirecting, setRedirecting] = useState<boolean>(false);
  const [status, setStatus] = useState<ClassTypes>({ status: "info-error" });

  async function onSubmit(data: PasswordTypes) {
    const props = {
      data,
      setLoading,
      setStatus,
      setRedirecting,
      setStatusMessage,
      logOut,
    };
    await handleUpdatePassword(props);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <h1>alterar senha</h1>
      <input
        type="password"
        placeholder="Digite a senha atual..."
        {...register("currentPassword")}
      />
      {errors.currentPassword && (
        <p className="error-text">{errors.currentPassword.message}</p>
      )}
      {statusMessage === "Senha incorreta!" && (
        <StatusText statusMessage={statusMessage} status={status.status} />
      )}
      <input
        type="password"
        placeholder="Digite uma nova senha..."
        {...register("newPassword")}
      />
      {errors.newPassword && (
        <p className="error-text">{errors.newPassword.message}</p>
      )}

      <input
        type="password"
        placeholder="Confirme sua senha..."
        {...register("confirmNewPassword")}
      />
      {errors.confirmNewPassword && (
        <p className="error-text">{errors.confirmNewPassword.message}</p>
      )}
      {statusMessage !== "" && statusMessage !== "Senha incorreta!" && (
        <StatusText statusMessage={statusMessage} status={status.status} />
      )}
      <button
        type="submit"
        className="button-edit-password"
        disabled={loading || redirecting}
      >
        {loading ? <LoadingCircle /> : "ENVIAR"}
      </button>
    </form>
  );
}
