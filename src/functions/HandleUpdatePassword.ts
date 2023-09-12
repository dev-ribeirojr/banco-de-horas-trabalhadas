import { Dispatch, SetStateAction } from "react";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth } from "../services/firebaseConection";
import { UpdateProps } from "../components/types/ProfileTypes";

export async function handleUpdatePassword({
  data,
  setLoading,
  setStatus,
  setRedirecting,
  setStatusMessage,
  logOut,
}: UpdateProps) {
  setLoading(true);
  const { currentPassword, newPassword } = data;

  const userAuth = auth.currentUser;
  const credentialEmail = userAuth?.email;

  if (userAuth && credentialEmail) {
    const credential = EmailAuthProvider.credential(
      credentialEmail,
      currentPassword
    );

    try {
      await reauthenticateWithCredential(userAuth, credential);
      await updatePassword(userAuth, newPassword);

      setLoading(false);
      setStatus({ status: "info-sucess" });
      setStatusMessage("Senha alterada, faça login novamente!");

      setRedirecting(true);
      renderMessage(setStatusMessage);

      setTimeout(() => {
        logOut();
        setRedirecting(false);
      }, 4000);
    } catch (error: any) {
      setLoading(false);
      setRedirecting(false);
      setStatus({ status: "info-error" });
      renderMessage(setStatusMessage);

      if (error.code === "auth/wrong-password") {
        setStatusMessage("Senha incorreta!");
        return;
      }
      setStatusMessage("Ops! Aconteceu algum erro!");
      console.log(error);
    }
  }
}

function renderMessage(setStatusMessage: Dispatch<SetStateAction<string>>) {
  setTimeout(() => {
    setStatusMessage("");
  }, 5000);
}
