import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '~/store'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const userIsLoggedIn = useAuthStore((state) => state.user?.username)

  if (!userIsLoggedIn) return <Navigate to={'/auth'} />
  return <div>{children}</div>
}
