import { z } from "zod";

function convert(value: string, valueDois: string) {
  const valueS = Number(value.replace(":", ""));
  const valueDoisS = Number(valueDois.replace(":", ""));

  return valueS > valueDoisS ? false : true;
}

export const schemaFormEdit = z
  .object({
    dateEdit: z.string().nonempty("Informe uma data"),
    startEdit: z.string().nonempty("campo obrigatório"),
    startIntervalEdit: z.string().nonempty("campo obrigatório"),
    endIntervalEdit: z.string().nonempty("campo obrigatório"),
    endEdit: z.string().nonempty("campo obrigatório"),
  })
  .refine((value) => convert(value.startEdit, value.startIntervalEdit), {
    message: "início do intervalo não pode ser menor que início",
    path: ["startInterval"],
  })
  .refine((value) => convert(value.startIntervalEdit, value.endIntervalEdit), {
    message: "fim do intervalo não pode ser menor que início do intervalo",
    path: ["endInterval"],
  })
  .refine((value) => convert(value.endIntervalEdit, value.endEdit), {
    message: "fim não pode ser menor que o fim do intervalo",
    path: ["end"],
  });
