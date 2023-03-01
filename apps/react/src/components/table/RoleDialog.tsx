import { useAppStore } from '~/store/app.store'
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '../ui/Dialog'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { request } from '~/lib/api'
import { useState } from 'react'

export const RoleDialog = () => {
  const queryClient = useQueryClient()
  const employeeIdToEdit = useAppStore((state) => state.employeeIdToEdit)
  const setEmployeeIdToEdit = useAppStore((state) => state.setEmployeeIdToEdit)

  const [currentUserRole, setCurrentUserRole] = useState<string>('')
  const [newUserRole, setNewUserRole] = useState<string>('')

  useQuery(
    ['employee', employeeIdToEdit],
    () => {
      return request({
        url: `/employee-data/employee/${employeeIdToEdit}`,
        method: 'GET',
        toJSON: true
      })
    },
    {
      enabled: !!employeeIdToEdit,
      onSuccess(data) {
        setCurrentUserRole(data?.departmentsLink[0]?.role)
      }
    }
  )

  const { mutate } = useMutation(
    (role: string) => {
      if (role === 'USER') {
        return request({
          url: `/user/demote`,
          method: 'POST',
          body: {
            employeeId: employeeIdToEdit
          }
        })
        // demote
      } else {
        // promote
        return request({
          url: `/user/promote`,
          method: 'POST',
          body: {
            employeeId: employeeIdToEdit
          }
        })
      }
    },
    {
      onSuccess() {
        queryClient.refetchQueries('employees')
        handleOnCloseDropdown()
      }
    }
  )

  function handleOnCloseDropdown() {
    setEmployeeIdToEdit(null)
    setNewUserRole('')
    setCurrentUserRole('')
  }

  if (!employeeIdToEdit) return null

  return (
    <Dialog open onOpenChange={(open) => !open && handleOnCloseDropdown()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Role</DialogTitle>
          <DialogDescription>
            You can change the user role. Changing from user to manager will
            promote the user to the manager role in its department.
          </DialogDescription>
        </DialogHeader>
        <div>
          <h4 className="text-xs mb-2 font-medium">Current role</h4>
          <Select onValueChange={setNewUserRole}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder={currentUserRole} />
            </SelectTrigger>
            <SelectContent position="popper" className="w-40">
              <SelectItem value="USER">USER</SelectItem>
              <SelectItem value="MANAGER">MANAGER</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end">
          <Button
            disabled={
              newUserRole && newUserRole !== currentUserRole ? false : true
            }
            onClick={() => mutate(newUserRole)}
            variant={'default'}
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
