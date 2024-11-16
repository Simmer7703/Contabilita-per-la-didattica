"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const isTeacher = session?.user?.role === "TEACHER"

  const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: "🏠" },
    { href: "/piano-dei-conti", label: "Piano dei Conti", icon: "📊" },
    { href: "/registrazioni", label: "Registrazioni", icon: "📝" },
    { href: "/libro-giornale", label: "Libro Giornale", icon: "📖" },
    { href: "/libro-mastro", label: "Libro Mastro", icon: "📚" },
    { href: "/bilancio", label: "Bilancio", icon: "💰" },
    { href: "/esercitazioni", label: "Esercitazioni", icon: "✏️" },
    ...(isTeacher ? [{ href: "/admin", label: "Area Docente", icon: "👨‍🏫" }] : []),
  ]

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 min-h-screen p-6 transition-colors">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              pathname === item.href
                ? "bg-[#f8f5f2] dark:bg-gray-700 text-[#d84727] dark:text-[#ff5a3d] font-medium text-base"
                : "text-gray-900 dark:text-gray-100 hover:bg-[#f8f5f2] dark:hover:bg-gray-700 hover:text-[#d84727] dark:hover:text-[#ff5a3d] text-base font-medium"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
