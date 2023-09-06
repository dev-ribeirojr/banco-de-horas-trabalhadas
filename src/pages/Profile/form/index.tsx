import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PasswordsProps } from "../../../components/types/EditPasswordTyp";
import { zodResolver } from "@hookform/resolvers/zod";
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

const schema = z
  .object({
    currentPassword: z.string().nonempty("Digite sua senha atual!"),
    newPassword: z.string().min(6, "Senha precisa ter pelo menos 6 digitos!"),
    confirmNewPassword: z.string().nonempty("É necessário confirmar a senha!"),
  })
  .refine((data) => data.confirmNewPassword === data.newPassword, {
    message: "As senhas não coincidem",
    path: ["confirmNewPassword"],
  });

type UpdateProps = {
  newPassword: string;
  currentPassword: string;
};

export function FormEditPassword({ render }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordsProps>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { logOut } = useContext(AuthContext);

  async function handleUpdatePassword({
    newPassword,
    currentPassword,
  }: UpdateProps) {
    setLoading(true);
    const userAuth: User | null = auth.currentUser;
    const credentialEmail = userAuth?.email;

    if (userAuth && credentialEmail) {
      //credential!
      const credential = EmailAuthProvider.credential(
        credentialEmail,
        currentPassword
      );
      await reauthenticateWithCredential(userAuth, credential)
        .then(async () => {
          console.log("senha correta");
          await updatePassword(userAuth, newPassword)
            .then(() => {
              //informar que a senha foi alterada e informar para fazer login novamente
              navigate("/");
              logOut();
              setLoading(false);
              render(false);
            })
            .catch((er) => {
              console.log(er);
              //informar erro
              setLoading(false);
            });
        })
        .catch((er) => {
          setLoading(false);
          //senha está incorreta
          if (er.code === "auth/wrong-password") {
            //senha incorreta
            return;
          }
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
      <button type="submit" className="button-edit-password" disabled={loading}>
        {loading ? <LoadingCircle /> : "ENVIAR"}
      </button>
    </form>
  );
}
