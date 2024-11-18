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
    <aside className="w-64 gradient-sidebar min-h-screen p-6 transition-colors">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
          key={item.href}
          href={item.href}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            pathname === item.href
              ? "bg-primary/10 text-accent font-semibold text-lg"
              : "text-accent hover:bg-primary/5 hover:text-primary text-lg font-medium"
          }`}
        >
          <span className="text-2xl">{item.icon}</span>
          <span>{item.label}</span>
        </Link>
        ))}
      </nav>
    </aside>
  )
}
