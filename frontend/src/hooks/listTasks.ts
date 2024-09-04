/* eslint-disable react-hooks/exhaustive-deps */

import { api } from "@/service/api"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { toast } from "sonner"

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
  page?: number
  search?: string
}

export interface IUseListaTasksProps {
  filters: IFiltersListTasks
}

export const useListTasks = ({ filters }: IUseListaTasksProps) => {
  const { ref, inView } = useInView()

  const fetchTask = useInfiniteQuery<IListTasks>({
    queryKey: ["list_tasks"],
    queryFn: async ({ pageParam }) => {
      const params = `page=${pageParam}`

      if (filters.search) params.concat(`&search=${filters.search}`)

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
