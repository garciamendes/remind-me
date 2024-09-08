import { CreateTask } from "@/pages/home/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import { toast } from "sonner"
import { useApi } from "./api"

export const useCreateTask = () => {
  const api = useApi()
  const [searchParams,] = useSearchParams()
  const search = searchParams.get('search')
  const queryClient = useQueryClient()

  const { mutateAsync: handleCreateTask, isPending, isSuccess } = useMutation({
    mutationFn: async (data: CreateTask) => {
      await api.post<CreateTask>('/api/tasks', data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list_tasks", search] })
      toast.success('Tarefa criada com sucesso!')
    },

    onError: () => toast.error('Error ao tentar criar a tarefa')
  })

  return { handleCreateTask, isPending, isSuccess  }
}