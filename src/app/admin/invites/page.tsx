"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { z } from "zod"

interface Invite {
  id: string
  email: string
  role: "STUDENT" | "TEACHER"
  used: boolean
  expires: string
  createdAt: string
}

const inviteSchema = z.object({
  email: z.string().email("Email non valida"),
  role: z.enum(["STUDENT", "TEACHER"], {
    invalid_type_error: "Seleziona un ruolo valido"
  })
})

export default function InvitesPage() {
  const { data: session } = useSession()
  const [email, setEmail] = useState("")
  const [role, setRole] = useState<"STUDENT" | "TEACHER">("STUDENT")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [inviteUrl, setInviteUrl] = useState("")
  const [invites, setInvites] = useState<Invite[]>([])
  const [loading, setLoading] = useState(true)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [selectedInviteId, setSelectedInviteId] = useState<string | null>(null)

  const fetchInvites = async () => {
    try {
      const response = await fetch("/api/invites")
      if (!response.ok) throw new Error("Errore nel caricamento degli inviti")
      const data = await response.json()
      setInvites(data)
    } catch (error) {
      console.error("Errore:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInvites()
  }, [message])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setError("")
    setInviteUrl("")

    try {
      const validatedData = inviteSchema.parse({ email, role })

      const response = await fetch("/api/invites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Errore durante l'invio dell'invito")
      }

      setMessage("Invito inviato con successo!")
      setInviteUrl(`${window.location.origin}${data.inviteUrl}`)
      setEmail("")
      setRole("STUDENT")
      fetchInvites()
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message)
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Si è verificato un errore durante l'invio dell'invito")
      }
    }
  }

  const handleRevokeClick = (inviteId: string) => {
    setSelectedInviteId(inviteId)
    setShowConfirmDialog(true)
  }

  const handleConfirmRevoke = async () => {
    if (!selectedInviteId) return

    try {
      const response = await fetch(`/api/invites/${selectedInviteId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Errore durante la revoca dell'invito")
      }

      setMessage("Invito revocato con successo")
      fetchInvites()
    } catch (error) {
      setError("Errore durante la revoca dell'invito")
    } finally {
      setShowConfirmDialog(false)
      setSelectedInviteId(null)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Gestione Inviti</h1>

      {message && (
        <div className="mb-4 p-4 bg-green-50 text-green-800 rounded-md">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-800 rounded-md">
          {error}
        </div>
      )}

      {inviteUrl && (
        <div className="mb-4 p-4 bg-blue-50 text-blue-800 rounded-md">
          <p>Link di invito:</p>
          <code className="block mt-2 p-2 bg-blue-100 rounded">
            {inviteUrl}
          </code>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-8 space-y-4 max-w-md">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Ruolo
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value as "STUDENT" | "TEACHER")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          >
            <option value="STUDENT">Studente</option>
            <option value="TEACHER">Docente</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Invia Invito
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Inviti Inviati</h2>
        {loading ? (
          <p>Caricamento...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ruolo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stato
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Scadenza
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data Invio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Azioni
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invites.map((invite) => (
                  <tr key={invite.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {invite.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {invite.role === "TEACHER" ? "Docente" : "Studente"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        invite.used 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {invite.used ? "Utilizzato" : "In attesa"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(invite.expires).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(invite.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <button
                        onClick={() => handleRevokeClick(invite.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Revoca
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Conferma Revoca</h3>
            <p className="text-gray-600 mb-6">
              Sei sicuro di voler revocare questo invito? 
              {invites.find(i => i.id === selectedInviteId)?.used && 
                " L'utente è già registrato e perderà l'accesso al sistema."}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Annulla
              </button>
              <button
                onClick={handleConfirmRevoke}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Conferma Revoca
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}