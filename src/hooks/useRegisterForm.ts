import { useForm } from "react-hook-form";
import { UserSignUpProps } from "../components/types/AuthType";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaRegister } from "../schema/RegisterSchema";

export function useRegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUpProps>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(schemaRegister),
  });

  return {
    register,
    handleSubmit,
    errors,
  };
}
