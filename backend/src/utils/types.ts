import z from 'zod'

export const CredentialsUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})
export type CredentialsUser = z.infer<typeof CredentialsUserSchema>
