/* eslint-disable react-refresh/only-export-components */
import { Button } from "@/components/ui/button"
import { Header } from "@/components/ui/header"
import { Input } from "@/components/ui/input"
import { Task } from "@/components/ui/task"
import { IFiltersListTasks, useListTasks } from "@/hooks/listTasks"
import { withAuth } from "@/hooks/withAuth"
import { LoaderCircle } from "lucide-react"
import { useState } from "react"

const Home = () => {
  const [filtersTasks, setFiltersTasks] = useState<IFiltersListTasks>({})

  const { data, status, refetch, refKeyNextPage } = useListTasks({ filters: filtersTasks })
  const [taskShowExpanded, setTaskShowExpanded] = useState('')
  const [taskToEdit, setTaskToEdit] = useState('')


  const handleIsEdit = (taskID: string) => {
    if (taskID === taskToEdit)
      setTaskToEdit('')
    else
      setTaskToEdit(taskID)
  }

  const handleIsExpanded = (taskID: string) => {
    if (taskID === taskShowExpanded)
      setTaskShowExpanded('')
    else
      setTaskShowExpanded(taskID)
  }

  // const changeFilters = (key: keyof IFiltersListTasks, value: string | number) => {
  //   setFiltersTasks(prevState => ({ ...prevState, [key]: value }))
  // }

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
                    completedAt: task.completedAt,
                    createdAt: task.createdAt,
                    modifiedAt: task.modifiedAt,
                    id: task.id,
                    userId: task.userId,
                  }} />
              )
            })
          )
        })}
        <div ref={refKeyNextPage}></div>

        {status === 'pending' && (
          <div className="w-full flex justify-center items-center">
            <div className='animate-spin'>
              <LoaderCircle className="text-orange-500" size={40} />
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <div className="flex flex-col h-full w-full bg-zinc-950">
      <Header />

      <div className="flex flex-col w-[1000px] h-[calc(100vh-var(--header-height))] pt-2 m-auto">
        <Input />

        <div className="flex flex-1 flex-col overflow-auto [&::-webkit-scrollbar]:hidden w-full pt-2">
          {renderTasks()}
        </div>
      </div>
    </div>
  )
}

export default withAuth(Home)