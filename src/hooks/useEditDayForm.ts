import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataForm, DataFormEdit } from "../components/types/HomeTypes";
import { schemaFormEdit } from "../schema/FormEditSchema";

export function useEditDayForm({
  date,
  start,
  startInterval,
  endInterval,
  end,
}: DataForm) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DataFormEdit>({
    defaultValues: {
      dateEdit: date,
      startEdit: start,
      startIntervalEdit: startInterval,
      endIntervalEdit: endInterval,
      endEdit: end,
    },
    resolver: zodResolver(schemaFormEdit),
  });

  return {
    register,
    handleSubmit,
    errors,
    reset,
  };
}
