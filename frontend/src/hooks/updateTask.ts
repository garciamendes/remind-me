import { TaskIDParams, UpdateTask } from "@/pages/home/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import { toast } from "sonner"
import { useApi } from "./api"

export interface IUpdateTaskProps extends TaskIDParams {
  data: UpdateTask
}

export const useUpdateTask = () => {
  const api = useApi()
  const [searchParams,] = useSearchParams()
  const search = searchParams.get('search')
  const queryClient = useQueryClient()

  const { mutateAsync: handleUpdateTask, isPending, isSuccess } = useMutation({
    mutationFn: async ({ taskID, data }: IUpdateTaskProps) => {
      await api.patch<UpdateTask>(`/api/tasks/${taskID}`, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list_tasks", search] })
      toast.success('Tarefa atualizada com sucesso!')
    },

    onError: () => toast.error('Error ao tentar atualizar a tarefa')
  })

  return { handleUpdateTask, isPending, isSuccess  }
}