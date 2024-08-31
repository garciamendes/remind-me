import { Outlet } from "react-router-dom"
import LogoImgSvg from "@/assets/images/logo.svg"
import PlaceholderImgSvg from "@/assets/images/placeholder-auth.svg"

export const BaseAuthenticate = () => {
  return (
    <div className="h-screen flex ">
      <div className="w-[500px] bg-zinc-950 flex flex-col px-8">
        <img className="h-20 mt-14 mb-20" src={LogoImgSvg} />

        <div className="flex flex-1 w-full h-full">
          <Outlet />
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center">
        <img src={PlaceholderImgSvg} />
      </div>
    </div>
  )
}