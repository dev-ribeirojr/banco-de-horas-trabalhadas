import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaLogin } from "../schema/LoginSchema";
import { UserSignIn } from "../components/types/UserTypes";

export function useLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignIn>({
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
