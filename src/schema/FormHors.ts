import { z } from "zod";

function convert(value: string, valueDois: string) {
  const valueS = Number(value.replace(":", ""));
  const valueDoisS = Number(valueDois.replace(":", ""));

  return valueS > valueDoisS ? false : true;
}

export const schemaFormHors = z
  .object({
    date: z.string().nonempty("Informe uma data"),
    start: z.string().nonempty("campo obrigatório"),
    startInterval: z.string().nonempty("campo obrigatório"),
    endInterval: z.string().nonempty("campo obrigatório"),
    end: z.string().nonempty("campo obrigatório"),
  })
  .refine((value) => convert(value.start, value.startInterval), {
    message: "início do intervalo não pode ser menor que início",
    path: ["startInterval"],
  })
  .refine((value) => convert(value.startInterval, value.endInterval), {
    message: "fim do intervalo não pode ser menor que início do intervalo",
    path: ["endInterval"],
  })
  .refine((value) => convert(value.endInterval, value.end), {
    message: "fim não pode ser menor que o fim do intervalo",
    path: ["end"],
  });
