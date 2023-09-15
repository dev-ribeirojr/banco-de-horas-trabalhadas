import { useForm } from "react-hook-form";
import { SendMessage } from "../components/types/SuportTypes";
import { schemaSuport } from "../schema/SuportSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export function useSuportForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SendMessage>({
    resolver: zodResolver(schemaSuport),
  });

  return { register, reset, handleSubmit, errors };
}
