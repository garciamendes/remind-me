import LogoSvg from '@/assets/images/logo.svg'
import { LogOut } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export const Header = () => {

  return (
    <div className="flex items-center justify-between px-8 bg-zinc-900 h-[var(--header-height)]">
      <img className='h-11' src={LogoSvg} alt="Logo" />

      <div className='flex gap-4'>
        <NavLink to={'/'} className='hover:text-orange-500/85 duration-300'>Home</NavLink>

        <LogOut className='cursor-pointer text-orange-500 hover:text-orange-500/85 duration-300' size={25} />
      </div>
    </div>
  )
}