import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as LogoSvg } from '~/assets/svg/logo.svg'
import { Button } from '~/components/ui/Button'
import { request } from '~/lib/api'
import { useAuthStore } from '~/store'

type FormData = {
  email: string
  password: string
}

export const AuthPage = () => {
  const { register, handleSubmit, reset } = useForm<FormData>()

  const setUser = useAuthStore((state) => state.setUser)
  const navigate = useNavigate()

  async function handleOnLogin(data: FormData) {
    try {
      const loginReq = await request({
        url: '/auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          username: data.email,
          password: data.password
        },
        preventLogoutOn401: true,
        toJSON: true
      })
      // catch http exceptions
      if (loginReq?.error) throw loginReq

      const userInfoReq = await request({
        url: '/user/me',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        preventLogoutOn401: true,
        toJSON: true
      })
      // catch http exceptions
      if (userInfoReq?.error) throw userInfoReq

      setUser({
        id: userInfoReq.id,
        username: userInfoReq.username,
        fullName: userInfoReq.fullName,
        role: userInfoReq.departmentsLink[0].role // FIXME: naive implementation
      })
      navigate('/')
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <LogoSvg className="w-12 h-12 mr-2" />E Corp
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(handleOnLogin)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="credentials@e-corp.com"
                  required
                  {...register('email')}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  {...register('password')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <Button className="w-full" type="submit">
                Sign in
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
