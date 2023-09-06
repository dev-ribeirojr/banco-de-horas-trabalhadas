import { z } from "zod";

export const schemaRecoverPassword = z.object({
  email: z
    .string()
    .email("Digite um email válido!")
    .nonempty("Digite seu email!"),
});
