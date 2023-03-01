import { useEffect } from 'react'
import { useAuthStore } from '~/store'
import { useAppStore } from '~/store/app.store'

export const LogoutPage = () => {
  const clearAuthStore = useAuthStore((state) => state.clear)
  const clearAppStore = useAppStore((state) => state.clear)

  useEffect(() => {
    fetch('http://localhost:3333/auth/logout', {
      method: 'POST',
      credentials: 'include'
    }).then(() => {
      clearAppStore()
      clearAuthStore()
    })
  }, [])

  return null
}
