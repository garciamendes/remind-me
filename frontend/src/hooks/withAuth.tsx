/* eslint-disable react-hooks/exhaustive-deps */

import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import { useCookies } from 'react-cookie'
import { KEY_AUTH } from '@/utils/constants'

export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  shouldBeAuthenticated = true
) => {
  const AuthenticatedComponent = (props: P) => {
    const navigate = useNavigate()
    const [cookies] = useCookies([KEY_AUTH])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const authToken = cookies[KEY_AUTH]

      if (!authToken && shouldBeAuthenticated) {
        navigate('/auth/login')
        return
      }

      if (authToken && !shouldBeAuthenticated) {
        navigate('/')
        return
      }

      setLoading(false)
    }, [localStorage.getItem('token')])

    return loading ? (
      <div className='flex items-center justify-center h-screen w-full'>
        <div className='animate-spin'>
          <LoaderCircle className="text-orange-500" size={50} />
        </div>
      </div>
    ) : <WrappedComponent {...props} />
  }

  return AuthenticatedComponent
}