import { CredentialsUserRegister } from "@/pages/authenticate/types"
import { api } from "@/service/api"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export const useCreateUser = () => {
  const navigate = useNavigate()

  const { mutateAsync: handleCreateUser, isPending } = useMutation({
    mutationFn: async (data: Omit<CredentialsUserRegister, 'confirmPassword'>) => {
      await api.post<Omit<CredentialsUserRegister, 'confirmPassword'>>('/api/auth/register', data)

    },
    onSuccess: () => {
      toast.success('Usuário criado com sucesso!')
      navigate('/auth/login')
    },
    onError: () => toast.error('Error ao tentar criar um novo usuário')
  })

  return { handleCreateUser, isPending }
}