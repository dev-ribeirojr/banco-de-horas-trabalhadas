import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaFormHors } from "../schema/FormHors";
import { DataForm } from "../components/types/HomeTypes";

export function useHomeForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DataForm>({
    resolver: zodResolver(schemaFormHors),
  });

  return {
    register,
    handleSubmit,
    errors,
    reset,
  };
}
