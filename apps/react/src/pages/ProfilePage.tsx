import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Layout } from '~/components/layout'
import { request } from '~/lib/api'

export const ProfilePage = () => {
  const [userData, setUserData] = useState<any>({})

  async function loadUserData() {
    try {
      const userData = await request({
        url: '/user/me',
        method: 'GET',
        toJSON: true
      })

      setUserData(userData)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <Layout>
      <h1 className="font-normal text-2xl mb-4 underline">
        Profile Information
      </h1>
      <div className="space-y-4">
        <div>
          <h4 className="font-bold">Email</h4>
          <p>{userData.username}</p>
        </div>
        <div>
          <h4 className="font-bold">Full Name</h4>
          <p>{userData.fullName}</p>
        </div>
        <div>
          <h4 className="font-bold">Departments</h4>
          <div className="space-y-2">
            {userData?.departmentsLink?.map((link: any) => {
              return (
                <div key={link.id}>
                  <p>Department: {link.department?.name}</p>
                  <p>Title: {link.jobTitle}</p>
                  <p>Role: {link.role}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}
