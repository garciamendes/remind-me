import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full gap-6 px-2">
      <p className="text-zinc-400 text-2xl text-center">
        Ops, pedimos desculpas pelo transtorno. <br /> Pedimos que recarregue novamente.
      </p>

      <Button
        onClick={() => navigate('/')}
        variant='outline'
        className="h-12"
        type="button">
        Recarregar a página
      </Button>
    </div>
  )
}