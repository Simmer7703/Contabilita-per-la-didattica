"use client"

import { useSession, signOut } from "next-auth/react"
import { useTheme } from "next-themes"
import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-4 pl-4">
            <div className="w-10 h-10 relative flex items-center">
              <Image
                src="/images/stats-icon.png"
                alt="Statistiche e grafici"
                width={40}
                height={40}
                className="object-contain dark:invert"
                priority
              />
            </div>
            <Link 
              href="/dashboard" 
              className="text-2xl font-bold text-[#d84727] dark:text-[#ff5a3d] flex items-center ml-2 hover:opacity-90 transition-opacity"
            >
              Contabilità Didattica
            </Link>
          </div>
          
          <div className="flex items-center gap-6 pr-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  className="text-gray-100"
                >
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              ) : (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  className="text-gray-700"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#f8f5f2] dark:bg-gray-700 flex items-center justify-center">
                <span className="text-base font-medium text-[#d84727] dark:text-[#ff5a3d]">
                  {session?.user?.name?.[0]?.toUpperCase()}
                </span>
              </div>
              <span className="text-base font-medium text-gray-700 dark:text-gray-200">
                {session?.user?.name}
              </span>
            </div>

            <button
              onClick={() => signOut({ callbackUrl: "/auth/signin" })}
              className="px-6 py-2.5 text-base font-medium text-white bg-[#d84727] hover:bg-[#c13d20] dark:bg-[#ff5a3d] dark:hover:bg-[#ff4524] rounded-lg transition-colors shadow-sm flex items-center gap-2"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
