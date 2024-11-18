"use client"

import { useSession } from "next-auth/react"

export default function DashboardPage() {
    const { data: session } = useSession()
  
    return (
      <div className="min-h-screen gradient-background p-8 transition-colors">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
            <p className="mt-1 text-gray-500 dark:text-gray-300">
              Benvenuto, {session?.user?.name || 'Utente'}
            </p>
          </div>
  
          <div className="grid gap-6 md:grid-cols-2">
            <div className="group block p-6 bg-gradient-to-br from-gray to-yellow-90 dark:from-gray-800 dark:to-gray-900 rounded-[20px] border border-border/50 shadow-lg hover:shadow-xl transition-all duration-200">
          
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3 group-hover:scale-110 transition-transform duration-200">
                  {session?.user?.role === 'TEACHER' ? '👨‍🏫' : '👨‍🎓'}
                </span>
                <h2 className="text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Il tuo ruolo
                </h2>
              </div>
              <p className="text-muted-foreground">
                {session?.user?.role === 'TEACHER' ? 'Docente' : 'Studente'}
              </p>
            </div>
            
            <div className="group block p-6 bg-gradient-to-br from-gray to-yellow-90 dark:from-gray-800 dark:to-gray-900 rounded-[20px] border border-border/50 shadow-lg hover:shadow-xl transition-all duration-200">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3 group-hover:scale-110 transition-transform duration-200">
                  ✉️
                </span>
                <h2 className="text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Email
                </h2>
              </div>
              <p className="text-muted-foreground">
                {session?.user?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }