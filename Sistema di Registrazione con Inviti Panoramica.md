# Sistema di Registrazione con Inviti
## Panoramica
Implementazione di un sistema di registrazione sicuro basato su inviti per l'applicazione di contabilità in partita doppia. Il sistema consente ai docenti di invitare nuovi utenti (studenti o altri docenti) e gestire gli accessi in modo controllato.

## Componenti Principali
### Schema di Validazione

```typescript
const registerSchema = z.object({
  name: z.string().min(2, "Il nome deve contenere almeno 2 caratteri"),
  email: z.string().email("Email non valida"),
  password: z.string().min(8, "La password deve contenere almeno 8 caratteri"),
})
```

Schema Zod per la validazione dei dati di registrazione con requisiti minimi per nome, email e password.

### Gestione dello Stato

```typescript
export default function RegisterPage({ params }: { params: Promise<{ token: string }> }) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  
  const { token } = use(params)
```

### Gestione dello stato del form con React hooks e gestione del token di invito.

### Gestione Submit e Validazione

```typescript
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const validatedData = registerSchema.parse({ name, email, password })
        headers: { "Content-Type": "application/json" },
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...validatedData,
          token
        }),
      })
      if (!response.ok) {
      const data = await response.json()
      }
      if (!response.ok) {
        throw new Error(data.error || "Errore durante la registrazione")
      }
      if (err instanceof z.ZodError) {
      router.push("/auth/signin?message=Registrazione completata con successo")
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message)
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Si è verificato un errore durante la registrazione")
      }
    } finally {
      setLoading(false)
    }
  }

```

Logica di gestione del submit del form con:
- Validazione dei dati
- Chiamata API
- Gestione errori
- Feedback utente

### Interfaccia Utente

```typescript
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Registrazione
          </h2>
        </div>
            <div className="text-sm text-red-700">{error}</div>
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}
            <div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Nome</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Nome"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
              />
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? "Registrazione in corso..." : "Registrati"}
            </button>
          </div>
        </form>
      </div>
          </div>
  )
```

Form di registrazione responsive con:
- Campi validati
- Gestione errori visiva
- Feedback stato di caricamento
- Design accessibile

### Funzionalità

- Sicurezza
  - Validazione token lato server
  - Hashing password con bcryptjs
  - Protezione contro registrazioni non autorizzate
  - Verifica corrispondenza email/invito

### UX/UI

- Form responsive con Tailwind CSS
- Feedback visivo stati di caricamento
- Messaggi di errore localizzati
- Reindirizzamento post-registrazione

### Validazione
- Validazione client-side con Zod
- Validazione server-side del token
- Verifica email corrispondente all'invito
- Gestione errori completa

### Dipendenze
- bcryptjs (hashing password)
- @types/bcryptjs (type definitions)
- zod (validazione schema)
- next/navigation (routing)
- react (gestione stato)

### Note Tecniche
- Utilizzo di React.use() per params
- Gestione asincrona delle chiamate API
- Pattern di gestione errori TypeScript
- Integrazione con il sistema di autenticazione esistente
- Test
  - Registrazione con token valido
  - Gestione token invalidi/scaduti
  - Validazione email non corrispondente
  - Revoca accessi
  - Gestione errori di rete

### Note per il Deploy
- Configurare variabili d'ambiente
- Verificare permessi database
- Controllare configurazione CORS
- Testare flusso completo in produzione

### Miglioramenti Futuri
- Aggiungere conferma password
- Implementare requisiti password più stringenti
- Aggiungere reCAPTCHA
- Migliorare feedback visivo validazione
- Implementare verifica email
