import LogoSvg from '@/assets/images/logo.svg'
import { KEY_AUTH } from '@/utils/constants'
import { LogOut } from 'lucide-react'
import { useCookies } from 'react-cookie'
import { NavLink } from 'react-router-dom'

export const Header = () => {
  const [, setCookie] = useCookies([KEY_AUTH])

  const handleLogout = () => {
    setCookie(KEY_AUTH, '', {
      path: '/',
      maxAge: 0,
      sameSite: true,
    })
    window.location.href = '/'
  }

  return (
    <div className="flex items-center justify-between px-8 bg-zinc-900 h-[var(--header-height)]">
      <img className='h-11' src={LogoSvg} alt="Logo" />

      <div className='flex gap-4'>
        <NavLink to={'/'} className='hover:text-orange-500/85 duration-300'>Home</NavLink>

        <LogOut
          onClick={handleLogout}
          className='cursor-pointer text-orange-500 hover:text-orange-500/85 duration-300'
          size={25} />
      </div>
    </div>
  )
}