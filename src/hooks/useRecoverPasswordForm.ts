import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { schemaRecoverPassword } from "../schema/RecoverPasswordSchema";
import { Email } from "../components/types/UserTypes";

export function useRecoverPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Email>({
    resolver: zodResolver(schemaRecoverPassword),
  });

  return {
    register,
    handleSubmit,
    errors,
  };
}
