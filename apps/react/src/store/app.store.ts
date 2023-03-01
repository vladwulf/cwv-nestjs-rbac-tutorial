import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

interface AppState {
  employeeIdToEdit: number | null
}

interface AppActions {
  setEmployeeIdToEdit: (id: number | null) => void
  clear: () => void
}

interface AppStore extends AppState, AppActions {}

const initialState: AppState = {
  employeeIdToEdit: null
}

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setEmployeeIdToEdit(id) {
          set({
            employeeIdToEdit: id
          })
        },
        clear() {
          set({
            ...initialState
          })
        }
      }),
      {
        name: 'app-store',
        getStorage: () => localStorage
      }
    ),
    {
      name: 'app-store'
    }
  )
)
