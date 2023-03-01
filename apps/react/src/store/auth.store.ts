import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

interface User {
  id: number
  fullName: string
  username: string
  role: string
}

interface UserState {
  user?: User
}

interface UserActions {
  setUser: (user: User) => void
  clear: () => void
}

interface AuthStore extends UserState, UserActions {}

const initialState: UserState = {
  user: undefined
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setUser(user) {
          set({
            user
          })
        },
        clear() {
          set({
            ...initialState
          })
        }
      }),
      {
        name: 'auth-store',
        getStorage: () => localStorage
      }
    ),
    {
      name: 'auth-store'
    }
  )
)
