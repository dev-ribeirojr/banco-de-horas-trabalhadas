import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schemaSuport } from "../schema/SuportSchema";

type Text = {
  text: string;
};

export function useSuportForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Text>({
    resolver: zodResolver(schemaSuport),
  });

  return { register, handleSubmit, errors, reset };
}
