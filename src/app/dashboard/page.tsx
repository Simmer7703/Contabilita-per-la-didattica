"use client"

import { useSession } from "next-auth/react"

export default function DashboardPage() {
    const { data: session } = useSession()
  
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800 p-8 transition-colors">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
            <p className="mt-1 text-gray-500 dark:text-gray-300">
              Benvenuto, {session?.user?.name || 'Utente'}
            </p>
          </div>
  
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-white dark:bg-gray-700 p-6 shadow transition-colors">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Il tuo ruolo</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {session?.user?.role === 'TEACHER' ? 'Docente' : 'Studente'}
              </p>
            </div>
            
            <div className="rounded-lg bg-white dark:bg-gray-700 p-6 shadow transition-colors">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Email</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{session?.user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }