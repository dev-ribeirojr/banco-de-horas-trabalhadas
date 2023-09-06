import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { schemaRecoverPassword } from "../schema/RecoverPasswordSchema";
import { FormProps } from "../components/types/RecoverTypes";

export function RecoverPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: zodResolver(schemaRecoverPassword),
  });

  return {
    register,
    handleSubmit,
    errors,
  };
}
