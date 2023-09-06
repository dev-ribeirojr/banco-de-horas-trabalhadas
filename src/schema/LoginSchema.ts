import { z } from "zod";
export const schemaLogin = z.object({
  password: z.string().nonempty("Digite sua senha!"),
  email: z
    .string()
    .email("Digite um email válido!")
    .nonempty("Digite um email!"),
});
