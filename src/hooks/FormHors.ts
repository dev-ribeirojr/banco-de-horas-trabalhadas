import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaFormHors } from "../schema/FormHors";
import { DateForm } from "../components/types/HomeTypes";

export function HomeForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DateForm>({
    resolver: zodResolver(schemaFormHors),
  });

  return {
    register,
    handleSubmit,
    errors,
  };
}
