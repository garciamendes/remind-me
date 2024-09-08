import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DeviceType, useDeviceType } from "@/hooks/deviceType"
import { CirclePlus, LoaderCircle, Search, X } from "lucide-react"
import { searchSchema, SearchType } from "."
import { ReactNode, useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CreateTask, createTaskSchema } from "./types"
import { useSearchParams } from "react-router-dom"
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useCreateTask } from "@/hooks/createTask"

export const CreateEditAndSearchTask = () => {
  const typeDevice = useDeviceType()
  const [, setSearchParams] = useSearchParams()
  const { handleCreateTask, isPending, isSuccess } = useCreateTask()
  const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false)
  const [enabledToSearch, setEnabledToSearch] = useState(false)
  const formSearch = useForm<SearchType>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: ''
    },
  })
  const formNewTaskSchema = useForm<CreateTask>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: '',
      description: ''
    },
  })

  useEffect(() => {
    if (typeDevice !== DeviceType.Mobile)
      setEnabledToSearch(false)
  }, [typeDevice])

  useEffect(() => {
    if (!isSuccess) return

    setOpenCreateTaskModal(false)
  }, [isSuccess])

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

  const onSubmit = async (data: CreateTask) => {
    await handleCreateTask(data)
  }

  const renderContentModal = () => {
    return (
      <DialogContent className="bg-zinc-800 border-none">
        <Form {...formNewTaskSchema}>
          <form onSubmit={formNewTaskSchema.handleSubmit(onSubmit)} className="flex flex-col h-full space-y-3 duration-500">
            <FormField
              control={formNewTaskSchema.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>

                  <FormControl>
                    <Input className="bg-zinc-700" placeholder="Ex: task" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={formNewTaskSchema.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>

                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Ex: lorem..."
                      className="text-zinc-100 bg-zinc-700 p-2 resize-none text-base" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex-1 flex flex-col !mt-4 gap-9">
              <Button className="h-12" type="submit" disabled={isPending}>
                {isPending ? (
                  <div className='animate-spin'>
                    <LoaderCircle className="text-zinc-100" size={20} />
                  </div>
                ) : 'Criar'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    )
  }

  const renderButtonCreateDefault = (children: ReactNode) => {
    return (
      <Dialog open={openCreateTaskModal} onOpenChange={setOpenCreateTaskModal}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>

        {renderContentModal()}
      </Dialog>
    )
  }

  const renderButtonAddTask = () => {
    if (enabledToSearch) return <></>

    if (typeDevice === DeviceType.Mobile) {
      return renderButtonCreateDefault(
        <Button variant='outline'>
          <CirclePlus size={25} className="text-orange-500 hover:text-zinc-200" />
        </Button>
      )
    }

    return renderButtonCreateDefault(
      <Button variant='outline'>
        Adicionar tarefa
      </Button>
    )
  }

  return (
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
  )
}