import { TaskIDParams } from "@/pages/home/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import { toast } from "sonner"
import { useApi } from "./api"

export const useDestroyTask = () => {
  const api = useApi()
  const [searchParams,] = useSearchParams()
  const search = searchParams.get('search')
  const queryClient = useQueryClient()

  const { mutateAsync: handleDestroyTask, isPending, isSuccess } = useMutation({
    mutationFn: async ({ taskID }: TaskIDParams) => {
      await api.delete(`/api/tasks/${taskID}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list_tasks", search] })
      toast.success('Tarefa deletada com sucesso!')
    },

    onError: () => toast.error('Error ao tentar deletar a tarefa')
  })

  return { handleDestroyTask, isPending, isSuccess  }
}