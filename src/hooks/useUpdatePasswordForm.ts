import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaUpdatePassword } from "../schema/UpdatePasswordSchema";
import { PasswordUpdateProfile } from "../components/types/ProfileTypes";

export function useUpdatePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordUpdateProfile>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(schemaUpdatePassword),
  });

  return {
    register,
    handleSubmit,
    errors,
  };
}
