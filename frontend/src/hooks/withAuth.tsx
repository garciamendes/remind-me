/* eslint-disable react-hooks/exhaustive-deps */

import { useNavigate } from 'react-router-dom'
import { localStorage } from '../utils'
import { useEffect, useState } from 'react'
import { LoaderCircle } from 'lucide-react'

export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  shouldBeAuthenticated = true
) => {
  const AuthenticatedComponent = (props: P) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const authToken = localStorage.getItem('token')

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