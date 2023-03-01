import { Layout } from '~/components/layout'
import { EmployeeTable } from '~/components/table'
import { useAuthStore } from '~/store'

export const MainPage = () => {
  const fullName = useAuthStore((state) => state.user?.fullName)
  const role = useAuthStore((state) => state.user?.role)
  return (
    <Layout>
      <h1 className="font-normal text-2xl mb-10">Hello, {fullName}</h1>

      {role !== 'USER' && (
        <>
          <h4 className="mb-5 text-xl font-semibold">Your employees</h4>
          <EmployeeTable />
        </>
      )}
    </Layout>
  )
}
