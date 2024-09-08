import { truncate } from "@/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"

export interface IPopupProps {
  content: string
  length?: number
}

export const Popup = ({ content, length }: IPopupProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {truncate(content, { length: length || 40 })}
        </TooltipTrigger>
        <TooltipContent>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}