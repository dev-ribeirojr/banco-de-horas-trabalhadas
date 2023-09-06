import { z } from "zod";

export const schemaUpdatePassword = z
  .object({
    currentPassword: z.string().nonempty("Digite sua senha atual!"),
    newPassword: z.string().min(6, "Senha precisa ter pelo menos 6 digitos!"),
    confirmNewPassword: z.string().nonempty("É necessário confirmar a senha!"),
  })
  .refine((data) => data.confirmNewPassword === data.newPassword, {
    message: "As senhas não coincidem",
    path: ["confirmNewPassword"],
  });
