/* eslint-disable react-hooks/exhaustive-deps */
import { useInfiniteQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { useSearchParams } from "react-router-dom"
import { toast } from "sonner"
import { useApi } from "./api"

export interface ITasks {
  id: string
  title: string
  description: string
  completedAt: Date | string
  userId: string
  createdAt: Date | string
  modifiedAt: Date | string
}

export interface IListTasks {
  results: ITasks[]
  currentPage: number
  next: number | null
  previous: number | null
}

export interface IFiltersListTasks {
  search?: string
}

export interface IUseListaTasksProps {
  filters: IFiltersListTasks
}

export const useListTasks = () => {
  const api = useApi()
  const { ref, inView } = useInView()
  const [searchParams,] = useSearchParams()
  const search = searchParams.get('search')

  const fetchTask = useInfiniteQuery<IListTasks>({
    queryKey: ["list_tasks", search],
    queryFn: async ({ pageParam }) => {
      let params = `page=${pageParam}`

      if (search) {
        params = `page=${pageParam}&search=${search}`
      }

      const response = await api.get(`/api/tasks?${params}`)

      return response.data
    },
    initialPageParam: 1,
    getPreviousPageParam: (firstPage) => firstPage.previous,
    getNextPageParam: (lastPage) => lastPage.next,
  })

  useEffect(() => {
    if (fetchTask.status !== "error") return

    toast.error("Error ao tentar carregar suas tasks")
  }, [fetchTask.status])

  useEffect(() => {
    if (!inView) return

    fetchTask.fetchNextPage()
  }, [fetchTask.fetchNextPage, inView])

  return { refKeyNextPage: ref, inView, ...fetchTask }
}
