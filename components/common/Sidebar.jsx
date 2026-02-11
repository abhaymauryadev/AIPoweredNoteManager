import React from 'react'
import Link from 'next/link'
export default function Sidebar() {
  return (
   <aside className='w-64 h-screen bg-gray-800 text-white'>
    <h1 className='text-2xl font-bold'>AI Notes</h1>
    <div className='flex flex-col gap-4'> </div>
    <nav>
      <ul className='flex flex-col gap-4'>
        <li>  
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/notes">Notes</Link>
        </li>
        <li>
          <Link href="/settings">Settings</Link>
        </li>
      </ul>
    </nav>
   </aside>
  )
}
