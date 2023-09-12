import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordsProps } from "../components/types/EditPasswordTypes";
import { schemaUpdatePassword } from "../schema/UpdatePasswordSchema";

export function useUpdatePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordsProps>({
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
