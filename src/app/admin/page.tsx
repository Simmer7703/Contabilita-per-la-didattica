"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"

interface AdminCard {
  title: string
  description: string
  href: string
  icon: string
}

const adminCards: AdminCard[] = [
  {
    title: "Gestione Inviti",
    description: "Invia e gestisci gli inviti per studenti e docenti",
    href: "/admin/invites",
    icon: "✉️"
  },
  {
    title: "Gestione Utenti",
    description: "Visualizza e gestisci gli utenti registrati",
    href: "/admin/users",
    icon: "👥"
  },
  {
    title: "Impostazioni",
    description: "Configura le impostazioni dell'applicazione",
    href: "/admin/settings",
    icon: "⚙️"
  }
]

export default function AdminPage() {
  const { data: session } = useSession()

  if (session?.user?.role !== "TEACHER") {
    return (
      <div className="p-8">
        <p className="text-red-500">Non hai i permessi per accedere a questa pagina</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Area Amministratore</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminCards.map((card) => (
          <Link 
            key={card.href}
            href={card.href}
            className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">{card.icon}</span>
              <h2 className="text-xl font-semibold">{card.title}</h2>
            </div>
            <p className="text-gray-600">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
