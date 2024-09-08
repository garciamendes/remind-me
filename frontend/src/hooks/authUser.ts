import { CredentialsUserLogin } from "@/pages/authenticate/types"
import { KEY_AUTH } from "@/utils/constants"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useCookies } from 'react-cookie'
import { useApi } from "./api"

export const useAuthUser = () => {
  const api = useApi()
  const navigate = useNavigate()
  const [, setCookie] = useCookies([KEY_AUTH])

  const { mutateAsync: handleLoginUser, isPending } = useMutation({
    mutationFn: async (data: CredentialsUserLogin) => {
      const response = await api.post<{ token: string }>('/api/auth/login', data)

      return response.data
    },
    onSuccess: ({ token }) => {
      setCookie(KEY_AUTH, token, {
        path: '/',
        sameSite: true,
      })
      navigate('/')
    },
    onError: () => toast.error('Error ao tentar fazer o login')
  })

  return { handleLoginUser, isPending }
}