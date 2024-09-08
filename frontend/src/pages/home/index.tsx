/* eslint-disable react-refresh/only-export-components */
import { Button } from "@/components/ui/button"
import { Header } from "@/components/ui/header"
import { Task } from "@/components/ui/task"
import { useListTasks } from "@/hooks/listTasks"
import { withAuth } from "@/hooks/withAuth"
import { useState } from "react"
import { toast } from "sonner"
import { z } from "zod"
import { CreateEditAndSearchTask } from "./create-and-search-task"
import { Loader } from "@/components/ui/loader"

export const searchSchema = z.object({
  search: z.string()
})

export type SearchType = z.infer<typeof searchSchema>

const Home = () => {
  const [taskShowExpanded, setTaskShowExpanded] = useState('')
  const [taskToEdit, setTaskToEdit] = useState('')

  const {
    data,
    status,
    refetch,
    refKeyNextPage,
    isFetchingNextPage,
    hasNextPage,
    isFetching
  } = useListTasks()

  const handleIsEdit = (taskID: string) => {
    if (taskShowExpanded) setTaskShowExpanded('')

    if (taskID === taskToEdit)
      setTaskToEdit('')
    else
      setTaskToEdit(taskID)
  }

  const handleIsExpanded = (taskID: string) => {
    if (taskToEdit) {
      toast.info('Cancele todas ações anteriores')
      return
    }

    if (taskID === taskShowExpanded)
      setTaskShowExpanded('')
    else
      setTaskShowExpanded(taskID)
  }

  const renderTasks = () => {
    if (status === 'error') {
      return (
        <div className="w-full flex flex-col justify-center items-center">
          <span>Pedimos desculpa pelo ocorrido</span>
          <Button
            onClick={() => refetch()}
            className="px-8 mt-3"
            type="button">
            Tentar novamente
          </Button>
        </div>
      )
    }

    return (
      <>
        {data?.pages.map(page => {
          return (
            page?.results.map(task => {
              return (
                <Task
                  key={task.id}
                  isExpanded={task.id === taskShowExpanded}
                  isEdit={task.id === taskToEdit}
                  onCancel={() => setTaskToEdit('')}
                  onExpanded={(id: string) => handleIsExpanded(id)}
                  onEdit={(id: string) => handleIsEdit(id)}
                  task={{
                    title: task.title,
                    description: task.description,
                    completedAt: task.completedAt as string,
                    createdAt: task.createdAt as string,
                    modifiedAt: task.modifiedAt as string,
                    id: task.id,
                    userId: task.userId,
                  }} />
              )
            })
          )
        })}

        {(isFetchingNextPage || isFetching) && (
          <div className="w-full flex justify-center items-center">
            <Loader className="text-orange-500" size={40} />
          </div>
        )}

        {hasNextPage && <div ref={refKeyNextPage}></div>}
      </>
    )
  }

  return (
    <div className="flex flex-col h-full w-full bg-zinc-950">
      <Header />

      <div className="flex flex-col w-[1000px] h-[calc(100vh-var(--header-height))] pt-4 m-auto responsive-container-home">
        <CreateEditAndSearchTask />

        <div className="flex flex-1 flex-col gap-4 overflow-auto [&::-webkit-scrollbar]:hidden w-full pt-2">
          {renderTasks()}
        </div>
      </div>
    </div>
  )
}

export default withAuth(Home)