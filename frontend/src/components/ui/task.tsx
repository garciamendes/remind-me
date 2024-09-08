/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "./button"
import { ITask } from "../types"
import { Input } from "./input"
import {
  ChevronDown,
  ChevronRight,
  EllipsisVertical,
  Pencil,
  Square,
  SquareCheckBig,
  Trash2
} from "lucide-react"
import { Textarea } from "./textarea"
import { z } from "zod"
import { UpdateTask } from "@/pages/home/types"
import { useUpdateTask } from "@/hooks/updateTask"
import { Loader } from "./loader"
import { ChangeEvent, useEffect, useState } from "react"
import { Dialog, DialogContent, DialogFooter } from "./dialog"
import { useDestroyTask } from "@/hooks/destroyTask"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"
import { Popup } from "./popup"
import { DeviceType, useDeviceType } from "@/hooks/deviceType"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

export interface ITaskProps {
  task: ITask
  isEdit?: boolean
  isExpanded?: boolean
  onCancel?: () => void
  onExpanded?: (id: string) => void
  onEdit?: (id: string) => void
}

export const TaskEditSchema = z.object({
  title: z.string().min(1, { message: "Campo obrigatório" }),
  description: z.string().min(1, { message: "Campo obrigatório" }),
})

export type TaskEdit = z.infer<typeof TaskEditSchema>

export const Task = ({
  task,
  isEdit,
  isExpanded,
  onEdit,
  onExpanded,
  onCancel,
}: ITaskProps) => {
  const deviceType = useDeviceType()
  const [openDestroyTaskModal, setOpenDestroyTaskModal] = useState(false)
  const { handleUpdateTask, isPending, isSuccess } = useUpdateTask()
  const {
    handleDestroyTask,
    isPending: isPeddingDestroy,
    isSuccess: isSuccessDestroy
  } = useDestroyTask()
  const [dataUpdate, setDataUpdate] = useState<Omit<UpdateTask, 'completedAt'>>({
    title: task.title,
    description: task.description,
  })

  useEffect(() => {
    if (!isSuccess) return

    onCancel?.()
  }, [isSuccess])

  useEffect(() => {
    if (!isSuccessDestroy) return

    setOpenDestroyTaskModal(false)
  }, [isSuccessDestroy])

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setDataUpdate(prevState => ({...prevState, [name]: value}))
  }

  const handleOnCancel = () => {
    setDataUpdate({
      title: task.title,
      description: task.description,
    })
    onCancel?.()
  }

  const handleOnSave = async () => {
    await handleUpdateTask({ taskID: task.id, data: dataUpdate })
  }

  const handleOnDelete = async () => {
    await handleDestroyTask({ taskID: task.id })
  }

  const handleCompleteTask = async () => {
    await handleUpdateTask({ taskID: task.id, data: { completedAt: new Date().toISOString() } })
  }

  const renderContentTask = () => {
    if (!isEdit && !isExpanded) return

    if (isEdit) {
      return (
        <div className="px-3 py-4">
          <Textarea
            name='description'
            value={dataUpdate.description}
            onChange={onChange}
            placeholder="Ex: lorem..."
            className="text-zinc-100 resize-none text-base" />

          <div className="w-full flex justify-end items-center gap-5 mt-2">
            <Button
              onClick={() => handleOnCancel()}
              variant='cancel'
              type="button"
              disabled={isPending}
              className="px-7" >
              Cancelar
            </Button>

            <Button
              onClick={handleOnSave}
              type='button'
              className="px-8"
              disabled={isPending}>
              {isPending ? <Loader /> : 'Salvar'}
            </Button>
          </div>
        </div>
      )
    }

    return (
      <p className="text-zinc-100 px-3 py-4">
        {task.description}
      </p>
    )
  }

  const renderContentActionTask = () => {
    if (deviceType === DeviceType.Mobile) {
      return (
        <Popover>
          <PopoverTrigger>
            <EllipsisVertical className="text-lg" />
          </PopoverTrigger>
          <PopoverContent className="bg-zinc-700 w-24 mr-8">
            <div className="flex items-center flex-col gap-6">
              {task.completedAt ? (
                <SquareCheckBig
                  size={25}
                  data-is-completed={Boolean(task.completedAt)}
                  onClick={handleCompleteTask}
                  className="text-zinc-100 hover:text-green-600/-500/80 duration-300 cursor-pointer data-[disabled=true]:opacity-50 data-[disabled=true]:pointer-events-none data-[disabled=true]:text-orange-500 data-[is-completed=true]:pointer-events-none data-[is-completed=true]:!cursor-default data-[is-completed=true]:text-green-500" />
              ) : (
                <Square
                  size={25}
                  onClick={handleCompleteTask}
                  className="text-zinc-100 hover:text-orange-500/80 duration-300 cursor-pointer data-[disabled=true]:opacity-50 data-[disabled=true]:pointer-events-none data-[disabled=true]:text-orange-500" />
              )}

              <Pencil
                data-is-completed={Boolean(task.completedAt)}
                data-disabled={isEdit}
                onClick={() => onEdit && onEdit(task.id)}
                className="text-zinc-100 hover:text-orange-500/80 duration-300 cursor-pointer data-[disabled=true]:opacity-50 data-[disabled=true]:pointer-events-none data-[disabled=true]:text-orange-500 data-[is-completed=true]:opacity-50 data-[is-completed=true]:pointer-events-none" size={25} />

              <Trash2
                data-is-completed={Boolean(task.completedAt)}
                onClick={() => setOpenDestroyTaskModal(true)}
                className="text-zinc-100 hover:text-orange-500/80 duration-300 cursor-pointer data-[is-completed=true]:opacity-50 data-[is-completed=true]:pointer-events-none"
                size={25} />
            </div>
          </PopoverContent>
        </Popover>
      )
    }

    return (
      <div className="flex items-center gap-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {task.completedAt ? (
                <SquareCheckBig
                  data-is-completed={Boolean(task.completedAt)}
                  onClick={handleCompleteTask}
                  className="text-zinc-100 hover:text-green-600/-500/80 duration-300 cursor-pointer data-[disabled=true]:opacity-50 data-[disabled=true]:pointer-events-none data-[disabled=true]:text-orange-500 data-[is-completed=true]:pointer-events-none data-[is-completed=true]:!cursor-default data-[is-completed=true]:text-green-500" />
              ) : (
                <Square
                  onClick={handleCompleteTask}
                  className="text-zinc-100 hover:text-orange-500/80 duration-300 cursor-pointer data-[disabled=true]:opacity-50 data-[disabled=true]:pointer-events-none data-[disabled=true]:text-orange-500" />
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>{task.completedAt ? 'Tarefa concluída' : 'Concluí tarefa'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Pencil
                data-is-completed={Boolean(task.completedAt)}
                data-disabled={isEdit}
                onClick={() => onEdit && onEdit(task.id)}
                className="text-zinc-100 hover:text-orange-500/80 duration-300 cursor-pointer data-[disabled=true]:opacity-50 data-[disabled=true]:pointer-events-none data-[disabled=true]:text-orange-500 data-[is-completed=true]:opacity-50 data-[is-completed=true]:pointer-events-none" size={25} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Editar tarefa</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Trash2
                data-is-completed={Boolean(task.completedAt)}
                onClick={() => setOpenDestroyTaskModal(true)}
                className="text-zinc-100 hover:text-orange-500/80 duration-300 cursor-pointer data-[is-completed=true]:opacity-50 data-[is-completed=true]:pointer-events-none"
                size={25} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Deletar tarefa</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    )
  }

  return (
    <div className="w-full h-auto">
      <Dialog open={openDestroyTaskModal} onOpenChange={setOpenDestroyTaskModal}>
        <DialogContent className="bg-zinc-800 border-none">
          <div className="flex flex-col flex-1 justify-center items-center text-center">
            <p className="text-lg">Essa ação deletará a tarefa</p>
            <span className="text-lg font-bold">"{task.title}"</span>
          </div>

          <DialogFooter className="mt-4 gap-4">
            <Button
              onClick={() => setOpenDestroyTaskModal(false)}
              variant='cancel'
              type="button"
              disabled={isPeddingDestroy}
              className="px-8" >
              Cancelar
            </Button>

            <Button
              onClick={handleOnDelete}
              type='button'
              variant='destructive'
              className="px-8 text-base"
              disabled={isPeddingDestroy}>
              {isPeddingDestroy ? <Loader /> : 'Deletar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div
        data-show-description={isEdit || isExpanded}
        className="w-full rounded-[20px] bg-zinc-900 rounded-b-[20px] data-[show-description=true]:h-auto duration-300  responsive-task">
        <div className="w-full flex justify-between bg-zinc-800 items-center h-16 px-3 rounded-[20px] z-50">
          <div className="flex flex-1 items-center gap-5">
            {(isExpanded || isEdit) ?
              <ChevronDown
                data-disabled={isEdit}
                onClick={() => onExpanded && onExpanded(task.id)}
                className="text-zinc-100 hover:text-orange-500/80 duration-300 cursor-pointer data-[disabled=true]:opacity-50 data-[disabled=true]:pointer-events-none" size={25} /> :
              <ChevronRight
                data-disabled={isEdit}
                onClick={() => onExpanded && onExpanded(task.id)}
                className="text-zinc-100 hover:text-orange-500/80 duration-300 cursor-pointer data-[disabled=true]:opacity-50 data-[disabled=true]:pointer-events-none" size={25} />}

            {isEdit ? (
              <div className="flex-1 mr-4">
                <Input
                  name='title'
                  value={dataUpdate.title}
                  onChange={onChange}
                  className="!text-base"
                  placeholder="Ex: lorem..."
                  withoutIcon={false} />
              </div>
            ) : (
              deviceType === DeviceType.Mobile ? (
                <Popup content={task.title} length={20} />
              ) : (
                <span className="text-zinc-100">
                  {task.title}
                </span>
              )
            )}
          </div>

          {renderContentActionTask()}
        </div>

        {renderContentTask()}
      </div>
    </div>
  )
}