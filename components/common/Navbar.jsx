import React from 'react'
import Image from 'next/image'
import Link from 'next/link'



export default function Navbar() {
  return (
    <nav className="w-full h-16 border-b border-gray-300 bg-white shadow-sm flex justify-center top-0 fixed z-50">
      <div className="flex justify-between items-center h-16 px-4 w-full max-w-5xl">

        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image src="/vercel.svg" alt="Logo" width={40} height={40}  className=''/>
          </Link>
          <span className="ml-2 font-bold text-lg text-gray-800">AI Notes Manager</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-7">
          <Link href="/features" className="text-gray-700 hover:text-blue-600 transition">
            Features
          </Link>
          <Link href="/pricing" className="text-gray-700 hover:text-blue-600 transition">
            Pricing
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">
            About
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-7">
          <button className="border rounded-full  text-blue-600 hover:bg-blue-50 transition px-4 py-2">
            Sign In
          </button>
          <button className=" border rounded-full text-blue-600 hover:bg-blue-50 transition">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  )
}