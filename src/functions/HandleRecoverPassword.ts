import { sendPasswordResetEmail } from "firebase/auth";
import { RecoverPassword } from "../components/types/RecoverTypes";
import { auth } from "../services/firebaseConection";
import { Dispatch, SetStateAction } from "react";

function handleRecoverStatus(
  setRecoverStatus: Dispatch<SetStateAction<boolean>>
) {
  setRecoverStatus(true);
  setTimeout(() => {
    setRecoverStatus(false);
  }, 5000);
}

export async function handleRecoverPassword({
  data,
  setClassStatus,
  setLoading,
  setMessageStatus,
  setRecoverStatus,
}: RecoverPassword) {
  const { email } = data;
  setLoading(true);

  try {
    await sendPasswordResetEmail(auth, email);

    setLoading(false);
    setClassStatus("info-sucess");
    setMessageStatus("Link de recuperação enviado!");
    handleRecoverStatus(setRecoverStatus);
  } catch (error: any) {
    setClassStatus("info-error");

    if (error.code === "auth/user-not-found") {
      //usuário não cadastrado
      setMessageStatus("Este email não existe em nosso sistema!");
      handleRecoverStatus(setRecoverStatus);
      setLoading(false);
      return;
    }
    setMessageStatus("Error ao enviar o link!");
    handleRecoverStatus(setRecoverStatus);
    setLoading(false);
    console.log(error);
  }
}
