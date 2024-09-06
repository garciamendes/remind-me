import { Button } from "./button"
import { ITask } from "../types"
import { Input } from "./input"
import { ChevronDown, ChevronRight, Pencil, Trash2 } from "lucide-react"
import { Textarea } from "./textarea"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export interface ITaskProps {
  task: ITask
  isEdit?: boolean
  isExpanded?: boolean
  onSave?: () => void
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
  onSave
}: ITaskProps) => {
  const { register, reset } = useForm({
    resolver: zodResolver(TaskEditSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
    },
  })

  const handleOnCancel = () => {
    reset({ title: task.title, description: task.description })
    onCancel?.()
  }

  const renderContentTask = () => {
    if (!isEdit && !isExpanded) return

    if (isEdit) {
      return (
        <div className="px-3 py-4">
          <Textarea
            {...register('description')}
            placeholder="Ex: lorem..."
            className="text-zinc-100 resize-none text-base" />

          <div className="w-full flex justify-end items-center gap-5 mt-2">
            <Button
              onClick={() => handleOnCancel()}
              variant='cancel'
              type="button"
              className="px-7" >
              Cancelar
            </Button>
            <Button
              onClick={() => onSave && onSave()}
              className="px-8"
              type="button">
              Salvar
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

  return (
    <div className="w-full h-auto">
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
                  {...register('title')}
                  className="!text-base"
                  placeholder="Ex: lorem..."
                  withoutIcon={false} />
              </div>
            ) : (
              <span className="text-zinc-100">{task.title}</span>
            )}
          </div>

          <div className="flex items-center gap-6">
            <Pencil
              data-disabled={isEdit}
              onClick={() => onEdit && onEdit(task.id)}
              className="text-zinc-100 hover:text-orange-500/80 duration-300 cursor-pointer data-[disabled=true]:opacity-50 data-[disabled=true]:pointer-events-none data-[disabled=true]:text-orange-500" size={25} />

            <Trash2 className="text-zinc-100 hover:text-orange-500/80 duration-300 cursor-pointer " size={25} />
          </div>
        </div>

        {renderContentTask()}
      </div>
    </div>
  )
}