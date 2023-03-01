import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { toast } from 'react-hot-toast'
import { request } from '~/lib/api'
import { useAuthStore } from '~/store'
import { RoleDialog } from './RoleDialog'
import { useAppStore } from '~/store/app.store'
import { useQuery } from 'react-query'

type EmployeeData = {
  id: number
  email: string
  name: string
  title: string
  department: string
  salary: string
  role: string
}

export const EmployeeTable = () => {
  const role = useAuthStore((state) => state.user?.role)
  const setEmployeeIdToEdit = useAppStore((state) => state.setEmployeeIdToEdit)

  const [employees, setEmployees] = useState<EmployeeData[]>([])

  const { isSuccess } = useQuery(
    'employees',
    () => {
      console.log({ role })
      const url = role === 'ADMIN' ? '/employee-data/all' : '/employee-data'
      return request({
        url,
        method: 'GET',
        toJSON: true
      })
    },
    {
      enabled: !!role,
      onSuccess(data) {
        console.log({ data })
        const parsedData = data.map((data: any) => {
          return {
            id: data.id,
            name: data.fullName,
            email: data.username,
            title: data.departmentsLink[0].jobTitle,
            department: data.departmentsLink[0].department.name,
            salary: data.salary,
            role: data.departmentsLink[0].role
          } as EmployeeData
        })
        setEmployees(parsedData)
      }
    }
  )

  if (!isSuccess) return null

  return (
    <>
      <RoleDialog />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Employee name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Title</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Department</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Role</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Salary</div>
              </th>
              {role === 'ADMIN' && (
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center justify-end">Action</div>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className={clsx(
                  'bg-white border-b dark:bg-gray-800 dark:border-gray-700',
                  employee.role !== 'USER' && 'bg-yellow-50'
                )}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {employee.name}
                </th>
                <td className="px-6 py-4">{employee.email}</td>
                <td className="px-6 py-4">{employee.title}</td>
                <td className="px-6 py-4">{employee.department}</td>
                <td className="px-6 py-4">{employee.role}</td>
                <td className="px-6 py-4">{employee.salary}</td>
                {role === 'ADMIN' && (
                  <td
                    className="px-6 py-4 text-right"
                    onClick={() => setEmployeeIdToEdit(employee.id)}
                  >
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
