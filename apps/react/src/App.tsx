import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from './components/common'
import { AuthPage, LogoutPage, MainPage, ProfilePage } from './pages'
import { Toaster } from 'react-hot-toast'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainPage />
      </ProtectedRoute>
    )
  },
  {
    path: '/auth',
    element: <AuthPage />
  },
  {
    path: '/Logout',
    element: (
      <ProtectedRoute>
        <LogoutPage />
      </ProtectedRoute>
    )
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    )
  }
])

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>
  )
}

export default App
