import { CredentialsUserLogin } from "@/pages/authenticate/types"
import { api } from "@/service/api"
import { localStorage } from "@/utils"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export const useAuthUser = () => {
  const navigate = useNavigate()

  const { mutateAsync: handleLoginUser, isPending } = useMutation({
    mutationFn: async (data: CredentialsUserLogin) => {
      const response = await api.post<{ token: string }>('/api/auth/login', data)

      return response.data
    },
    onSuccess: ({ token }) => {
      localStorage.setItem('token', token)
      navigate('/')
    },
    onError: () => toast.error('Error ao tentar fazer o login')
  })

  return { handleLoginUser, isPending }
}