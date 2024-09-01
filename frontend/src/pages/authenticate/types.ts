import { z } from "zod"

export const credentialsUserLoginSchema = z.object({
  email: z
    .string({ message: "Campo obrigatório" })
    .email({ message: "Email inválido" }),
  password: z.string({ message: "Campo obrigatório" }).min(1, { message: "Campo obrigatório" }),
})

export type CredentialsUserLogin = z.infer<typeof credentialsUserLoginSchema>

export const credentialsUserRegisterSchema = z.object({
  email: z
    .string({ message: "Campo obrigatório" })
    .email({ message: "Email inválido" }),
  password: z.string().min(1, { message: "Campo obrigatório" }),
  confirmPassword: z.string().min(1, { message: "Campo obrigatório" }),
}).refine(data => data.password === data.confirmPassword, { message: 'Senhas não são iguais', path: ['confirmPassword'] })

export type CredentialsUserRegister = z.infer<typeof credentialsUserRegisterSchema>
