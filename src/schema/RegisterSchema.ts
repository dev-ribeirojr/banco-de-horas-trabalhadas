import { z } from "zod";

export const schemaRegister = z.object({
  password: z.string().min(6, "Crie um senha com pelomenos 6 digitos"),
  email: z.string().email("Digite um email válido!"),
  name: z.string().nonempty("Digite seu nome"),
});
