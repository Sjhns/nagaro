'use client'

import { getPublicKey } from 'nostr-tools'
import { ReactNode, createContext, useCallback, useMemo, useState } from 'react'

type User = {
  priv?: string
  npub?: string
} | null

type AuthProps = {
  user: User
  loginWithPublicKey: (publicKey: string) => void
  loginWithPrivateKey: (privateKey: string) => void
  logout: () => void
  isAuthenticated: boolean
}

const getLocalStorage = () => {
  if (typeof window === 'undefined') {
    return null
  }

  const user = window.localStorage.getItem('myKey')

  if (user) {
    return JSON.parse(user)
  }

  return null
}

const setLocalStorage = (user: User) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('myKey', JSON.stringify(user))
  }
}

const clearLocalStorage = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('myKey')
  }
}

export const AuthContext = createContext({} as AuthProps)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(getLocalStorage)

  const loginWithPublicKey = useCallback((npub: string) => {
    setUser({ npub })
    setLocalStorage({ npub })
  }, [])

  const loginWithPrivateKey = useCallback((priv: string) => {
    const npub = getPublicKey(priv)

    setUser({ priv, npub })
    setLocalStorage({ priv, npub })
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    clearLocalStorage()
  }, [])

  const isAuthenticated = !!user

  const auth = useMemo(
    () => ({
      user,
      loginWithPublicKey,
      loginWithPrivateKey,
      logout,
      isAuthenticated,
    }),
    [user, loginWithPublicKey, loginWithPrivateKey, logout, isAuthenticated],
  )

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
