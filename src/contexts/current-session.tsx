'use client'

import { ReactNode, useContext, useEffect } from 'react'
import { AuthContext } from './use-auth'
import { redirect, useRouter } from 'next/navigation'
import { Spinner } from '@/components/spinner'

export const CurrentSessionPrivate = ({
  children,
}: {
  children: ReactNode
}) => {
  const { push } = useRouter()

  const { isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    if (!isAuthenticated) {
      redirect('/')
    }
  }, [isAuthenticated, push])

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    )
  }

  return <>{isAuthenticated && children} </>
}

export const CurrentSessionPublic = ({ children }: { children: ReactNode }) => {
  const { push } = useRouter()

  const { isAuthenticated, user } = useContext(AuthContext)

  useEffect(() => {
    if (isAuthenticated && user) {
      push('/global')
    }
  }, [isAuthenticated, push, user])

  return <>{!isAuthenticated && children} </>
}
