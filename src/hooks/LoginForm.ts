import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSignInProps } from "../components/types/AuthType";
import { schemaLogin } from "../schema/LoginSchema";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignInProps>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(schemaLogin),
  });
  return {
    register,
    handleSubmit,
    errors,
  };
}
