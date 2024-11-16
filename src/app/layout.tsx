import { DM_Sans } from "next/font/google"
import "./globals.css"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/options"
import { Providers } from "@/components/ui/providers"
import Navbar from "@/components/layout/Navbar"
import Sidebar from "@/components/layout/Sidebar"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={dmSans.className}>
        <Providers>
          <div className="min-h-screen flex flex-col bg-[#f8f5f2] dark:bg-gray-800 transition-colors">
            <div className="fixed top-0 left-0 right-0 z-50">
              <Navbar />
            </div>

            <div className="flex pt-16">
              <div className="fixed left-0 top-16 bottom-0 bg-white dark:bg-gray-800 transition-colors">
                <Sidebar />
              </div>

              <main className="flex-1 ml-64 p-8 min-h-[calc(100vh-4rem)] dark:bg-gray-800 transition-colors">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}