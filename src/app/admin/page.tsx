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
        <p className="text-destructive">Non hai i permessi per accedere a questa pagina</p>
      </div>
    )
  }

  return (
    <div className="p-8 gradient-background min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-foreground">Area Amministratore</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminCards.map((card) => (
          <Link 
            key={card.href}
            href={card.href}
            className="group block p-6 bg-gradient-to-br from-gray to-yellow-90 dark:from-gray-800 dark:to-gray-900 rounded-[20px] border border-border/50 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3 group-hover:scale-110 transition-transform duration-200">{card.icon}</span>
              <h2 className="text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{card.title}</h2>
            </div>
            <p className="text-muted-foreground">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
