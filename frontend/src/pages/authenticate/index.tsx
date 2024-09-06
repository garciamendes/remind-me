/* eslint-disable react-refresh/only-export-components */
import { Outlet } from "react-router-dom"
import LogoImgSvg from "@/assets/images/logo.svg"
import PlaceholderImgSvg from "@/assets/images/placeholder-auth.svg"
import { withAuth } from "@/hooks/withAuth"

const BaseAuthenticate = () => {
  return (
    <div className="h-screen flex">
      <div className="w-[500px] bg-zinc-950 flex flex-col px-8 md:max-lg:w-full sm:max-lg:w-full">
        <img className="h-20 mt-14 mb-20" src={LogoImgSvg} />

        <div className="flex flex-1 w-full h-full">
          <Outlet />
        </div>
      </div>

      <div className="flex flex-1 justify-center items-center md:max-lg:hidden sm:max-lg:hidden">
        <img src={PlaceholderImgSvg} />
      </div>
    </div>
  )
}

export default withAuth(BaseAuthenticate, false)