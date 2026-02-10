"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/navigation";
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="w-full h-16 border-b border-gray-300 bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">

        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/vercel.svg" alt="Logo" width={32} height={32} className="w-8 h-8" />
            <span className="font-bold text-lg text-gray-800">AI Notes Manager</span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/features" className="text-gray-700 hover:text-blue-600 transition font-medium">
            Features
          </Link>
          <Link href="/pricing" className="text-gray-700 hover:text-blue-600 transition font-medium">
            Pricing
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600 transition font-medium">
            About
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex gap-4 items-center">
          <button onClick={() => router.push("/auth/login")} className="text-gray-700 hover:text-blue-600 transition font-medium cursor-pointer">
            Sign In
          </button>
          <button onClick={() => router.push("/auth/register")} className="bg-blue-600 text-white rounded-full px-5 py-2 hover:bg-blue-700 transition font-medium cursor-pointer">
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-lg flex flex-col p-4 gap-4 animate-in slide-in-from-top-2">
          <Link
            href="/features"
            className="text-gray-700 hover:text-blue-600 transition font-medium py-2 border-b border-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-gray-700 hover:text-blue-600 transition font-medium py-2 border-b border-gray-100 cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className="text-gray-700 hover:text-blue-600 transition font-medium py-2 border-b border-gray-100 cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <div className="flex flex-col gap-3 mt-2">
            <Link
              href="/auth/login"
              className="text-center text-gray-700 hover:text-blue-600 transition font-medium py-2 border border-gray-200 rounded-full cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="text-center bg-blue-600 text-white rounded-full px-5 py-2 hover:bg-blue-700 transition font-medium cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}