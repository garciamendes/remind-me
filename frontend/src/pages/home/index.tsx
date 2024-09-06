/* eslint-disable react-refresh/only-export-components */
import { Button } from "@/components/ui/button"
import { Header } from "@/components/ui/header"
import { Input } from "@/components/ui/input"
import { Task } from "@/components/ui/task"
import { useListTasks } from "@/hooks/listTasks"
import { DeviceType, useDeviceType } from "@/hooks/useDeviceType"
import { withAuth } from "@/hooks/withAuth"
import { zodResolver } from "@hookform/resolvers/zod"
import { CirclePlus, LoaderCircle, Search, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"

export const searchSchema = z.object({
  search: z.string()
})

export type SearchType = z.infer<typeof searchSchema>

const Home = () => {
  const typeDevice = useDeviceType()
  const [, setSearchParams] = useSearchParams()
  const [taskShowExpanded, setTaskShowExpanded] = useState('')
  const [taskToEdit, setTaskToEdit] = useState('')
  const [enabledToSearch, setEnabledToSearch] = useState(false)
  const formSearch = useForm<SearchType>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: ''
    },
  })

  useEffect(() => {
    if (typeDevice !== DeviceType.Mobile)
      setEnabledToSearch(false)
  }, [typeDevice])

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

        {(isFetchingNextPage || isFetching) && (
          <div className="w-full flex justify-center items-center">
            <div className='animate-spin'>
              <LoaderCircle className="text-orange-500" size={40} />
            </div>
          </div>
        )}

        {hasNextPage && <div ref={refKeyNextPage}></div>}
      </>
    )
  }

  function handleChangeFilter(data: SearchType) {
    setSearchParams({ 'search': data.search || '' })
  }

  const renderSearchBar = () => {
    if (enabledToSearch) return <></>

    if (typeDevice === DeviceType.Mobile) {
      return (
        <div className="p-2 px-4 bg-zinc-800 w-max rounded-md">
          <Search
            className="cursor-pointer"
            onClick={() => setEnabledToSearch(true)}
            size={25} />
        </div>
      )
    }

    return (
      <Input
        {...formSearch.register('search')}
        iconDirection="right"
        placeholder="Busque pelo o título da task"
        icon={
          <Search
            className="cursor-pointer"
            onClick={formSearch.handleSubmit(handleChangeFilter)}
            size={25} />
        } />
    )
  }

  const renderButtonAddTask = () => {
    if (enabledToSearch) return <></>

    if (typeDevice === DeviceType.Mobile) {
      return (
        <Button variant='outline'>
          <CirclePlus size={25} className="text-orange-500 hover:text-zinc-200" />
        </Button>
      )
    }

    return (
      <Button variant='outline'>
        Adicionar tarefa
      </Button>
    )
  }

  return (
    <div className="flex flex-col h-full w-full bg-zinc-950">
      <Header />

      <div className="flex flex-col w-[1000px] h-[calc(100vh-var(--header-height))] pt-4 m-auto responsive-container-home">
        <div className="flex justify-between items-center">
          <form
            data-focus-search={enabledToSearch}
            className="w-2/5 responsive-content-search data-[focus-search=true]:!w-full"
            onSubmit={formSearch.handleSubmit(handleChangeFilter)}>
            {renderSearchBar()}

            {enabledToSearch && (
              <Input
                {...formSearch.register('search')}
                iconDirection="right"
                placeholder="Busque pelo o título da task"
                icon={
                  <div className="flex items-center gap-3">
                    <Search
                      className="cursor-pointer"
                      onClick={formSearch.handleSubmit(handleChangeFilter)}
                      size={25} />

                    <X
                      className="cursor-pointer"
                      onClick={() => {
                        formSearch.reset()
                        setEnabledToSearch(false)
                      }}
                      size={25} />
                  </div>
                }
              />
            )}
          </form>

          {renderButtonAddTask()}
        </div>

        <div className="flex flex-1 flex-col gap-4 overflow-auto [&::-webkit-scrollbar]:hidden w-full pt-2">
          {renderTasks()}
        </div>
      </div>
    </div>
  )
}

export default withAuth(Home)