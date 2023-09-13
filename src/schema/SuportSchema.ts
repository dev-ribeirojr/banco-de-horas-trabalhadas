import { z } from "zod";

export const schemaSuport = z.object({
  text: z.string().nonempty("Digite sua mensagem!"),
});
