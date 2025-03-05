import { Feature } from '@/components/feature'
import { NavBar } from '@/components/navBar'
import React from 'react'

const Dashboard = () => {
  return (
    <div className="items-center justify-items-center  p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] ">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="w-full">
          <NavBar />
          <Feature />
        </div>
      </main>
    </div>
  )
}

export default Dashboard