import React, { ReactNode } from 'react'
import { Navbar } from './Navbar'

export const Layout: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="pt-10 pb-20 container px-4 max-w-screen-xl mx-auto">
        {children}
      </main>
    </div>
  )
}
