import { cn } from "@/lib/utils"
import { LoaderCircle } from "lucide-react"

export interface ILoaderProps {
  size?: number
  className?: string
}

export const Loader = ({ size, className }: ILoaderProps) => {
  return (
    <div className='animate-spin'>
      <LoaderCircle className={cn("text-zinc-100", className)} size={size || 20} />
    </div>
  )
}