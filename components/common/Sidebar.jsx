"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import {
  LayoutDashboard,
  Logs,
  FolderOpen,
  Sparkles,
  Tags,
  Trash,
  Settings,
  Menu,
  X
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

export default function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(true)

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/notes', label: 'All Notes', icon: Logs },
    { href: '/notebooks', label: 'Notebooks', icon: FolderOpen },
    { href: '/summaries', label: 'AI Summaries', icon: Sparkles },
    { href: '/tags', label: 'Tags', icon: Tags },
    { divider: true },
    { href: '/trash', label: 'Trash', icon: Trash }
  ]

  return (
    <>
      {/* Toggle button for mobile */}
      <button
        className="md:hidden p-2 text-gray border-gray-900 bg-white fixed top-4 right-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <aside
        className={`fixed md:static top-0 left-0 h-screen bg-gray-800 text-white flex flex-col p-4 transition-transform duration-300 z-40
          ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full md:w-64'}`}
      >
        <h1 className="text-2xl font-bold mb-6">AI Notes</h1>

        <nav className="flex-1">
          <ul className="flex flex-col gap-4">
            {navItems.map((item, idx) =>
              item.divider ? (
                <hr
                  key={idx}
                  className="w-56 mx-auto border-gray-600"
                />
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 hover:text-blue-400 ${pathname.startsWith(item.href) ? 'bg-gray-700 py-2 px-1 rounded transition-colors duration-300' : ''
                      }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className="mt-6 border-t border-gray-700 pt-4 flex gap-4 justify-between items-center ">
          {session?.user?.name && (
            <p className="mb-2 text-sm text-gray-300 flex justify-center items-center gap-2">
              <Image
                src={session.user?.image || "/default-avatar.png"}
                alt={session.user?.name || "User avatar"}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <span className="font-semibold">{session.user?.name}</span>
            </p>
          )}
          <ul>
            <li>
              <Link
                href="/settings"
                className="flex items-center justify-center gap-2 hover:text-blue-400"
              >
                <Settings className="w-5 h-5" />

              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}