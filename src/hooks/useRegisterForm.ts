import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaRegister } from "../schema/RegisterSchema";
import { UserSignUp } from "../components/types/UserTypes";

export function useRegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUp>({
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
