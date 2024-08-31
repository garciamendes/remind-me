import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CredentialsUserRegister, credentialsUserRegisterSchema } from "./types"

export const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const formCredentials = useForm<CredentialsUserRegister>({
    resolver: zodResolver(credentialsUserRegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
  })

  function onSubmit(data: CredentialsUserRegister) {
    console.log(data)
  }

  const handleShowPassword = () => setShowPassword(!showPassword)

  return (
    <div className="flex-1">
      <Form {...formCredentials}>
        <form onSubmit={formCredentials.handleSubmit(onSubmit)} className="flex flex-col h-full space-y-8 duration-500">
          <FormField
            control={formCredentials.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>

                <FormControl>
                  <Input placeholder="Ex: example@example.com" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={formCredentials.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>

                <FormControl>
                  <Input
                    iconDirection="right"
                    icon={
                      !showPassword ?
                        <Eye className="cursor-pointer" onClick={handleShowPassword} /> :
                        <EyeOff className="cursor-pointer" onClick={handleShowPassword} />}
                    type={!showPassword ? "password" : "text"}
                    placeholder={`Ex: ${'•'.repeat(16)}`} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={formCredentials.control}
            name="confirmPassword"
            render={({ field, formState }) => {
              return (
                <FormItem>
                  <FormLabel>Confirme sua senha</FormLabel>

                  <FormControl>
                    <Input
                      iconDirection="right"
                      icon={
                        !showPassword ?
                          <Eye className="cursor-pointer" onClick={handleShowPassword} /> :
                          <EyeOff className="cursor-pointer" onClick={handleShowPassword} />}
                      type={!showPassword ? "password" : "text"}
                      placeholder={`Ex: ${'•'.repeat(16)}`} {...field} />
                  </FormControl>

                  <FormMessage>
                    {formState.errors.confirmPassword?.message}
                  </FormMessage>
                </FormItem>
              )
            }}
          />

          <div className="flex-1 flex flex-col !mt-32 gap-9">
            <Button className="h-12" type="submit">Entrar</Button>

            <div className="relative flex items-center justify-center">
              <hr className="w-full border-t border-orange-500 mx-auto" />
              <span className="text-orange-500 font-medium absolute bg-zinc-950 px-3">Ou</span>
            </div>

            <Button
              onClick={() => navigate('/auth/login')}
              variant='outline'
              className="h-12"
              type="button">
              Logar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}