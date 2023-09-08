import { useContext, useState } from "react";
import {
  EmailAuthProvider,
  User,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth } from "../../../services/firebaseConection";
import { LoadingCircle } from "../../../components/loading";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth";
import { InfoText, UpdateProps } from "../../../components/types/ProfileProps";
import { UpdatePasswordForm } from "../../../hooks/UpdatePasswordForm";

import StatusText from "../../../components/StatusMessage";

export function FormEditPassword() {
  const { register, handleSubmit, errors } = UpdatePasswordForm();

  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { logOut } = useContext(AuthContext);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [redirecting, setRedirecting] = useState<boolean>(false);
  const [status, setStatus] = useState<InfoText>({ status: "info-error" });

  function handleRedirect() {
    setTimeout(() => {
      navigate("/");
      logOut();
      setRedirecting(false);
    }, 5000);
  }

  function renderMessage() {
    setTimeout(() => {
      setStatusMessage("");
    }, 5000);
  }

  async function handleUpdatePassword({
    newPassword,
    currentPassword,
  }: UpdateProps) {
    setLoading(true);
    const userAuth: User | null = auth.currentUser;
    const credentialEmail = userAuth?.email;

    if (userAuth && credentialEmail) {
      const credential = EmailAuthProvider.credential(
        credentialEmail,
        currentPassword
      );
      await reauthenticateWithCredential(userAuth, credential)
        .then(async () => {
          await updatePassword(userAuth, newPassword)
            .then(() => {
              setLoading(false);
              setStatus({ status: "info-sucess" });
              setStatusMessage("Senha alterada, faça login novamente!");

              setRedirecting(true);
              renderMessage();
              handleRedirect();
            })
            .catch((er) => {
              console.log(er);
              setStatusMessage("Ops! Aconteceu algum erro!");
              setStatus({ status: "info-error" });
              setLoading(false);
              renderMessage();
            });
        })
        .catch((er) => {
          setLoading(false);
          setStatus({ status: "info-error" });
          renderMessage();
          if (er.code === "auth/wrong-password") {
            setStatusMessage("Senha incorreta!");
            return;
          }
          setStatusMessage("Ops! Aconteceu algum erro!");
          console.log(er);
        });
    }
  }

  return (
    <form onSubmit={handleSubmit(handleUpdatePassword)} autoComplete="off">
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
