


1. **Modifiche allo sfondo globale** in `globals.css`:

```7:8:src/app/globals.css
    --background-start: 0 0% 92%;
    --background-end: 39 100% 94%;
```

Abbiamo reso più marcata la sfumatura dello sfondo modificando i valori:
```css
--background-start: 0 0% 92%;
--background-end: 39 100% 94%;
```

2. **Uniformato lo stile delle card** in `dashboard/page.tsx`:

```18:47:src/app/dashboard/page.tsx
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
```

Abbiamo applicato lo stesso stile delle card dell'area amministratore, con:
- Sfondo sfumato
- Icone animate
- Testo con gradiente
- Effetti hover
- Ombre e bordi uniformi

3. **Aggiunta delle classi di utilità** in `globals.css`:
```css
@layer utilities {
  .gradient-navbar {
    @apply bg-gradient-to-r from-gray-100 to-amber-50 dark:from-gray-900 dark:to-amber-950 border-b border-border/50;
  }
  
  .gradient-sidebar {
    @apply bg-gradient-to-b from-gray-50 to-amber-50/50 dark:from-gray-900 dark:to-amber-950/50 border-r border-border/50;
  }
}
```

4. **Modifiche alla Navbar e Sidebar**:
- Applicata la classe `gradient-navbar` alla Navbar
- Applicata la classe `gradient-sidebar` alla Sidebar
- Aumentata la dimensione del testo nella Sidebar da `text-base` a `text-lg`
- Aumentata la dimensione delle icone nella Sidebar da `text-xl` a `text-2xl`

5. **Uniformato lo stile delle card** nella homepage (`page.tsx`):

```18:48:src/app/page.tsx
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <Link 
              href="/auth/signin"
              className="group block p-6 bg-gradient-to-br from-gray-50 to-amber-50/30 dark:from-gray-800 dark:to-gray-900 rounded-[20px] border border-border/50 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3 group-hover:scale-110 transition-transform duration-200">👨‍🎓</span>
                <h2 className="text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Per gli Studenti
                </h2>
              </div>
              <p className="text-muted-foreground">
                Accedi per iniziare il tuo percorso di apprendimento della contabilità
              </p>
            </Link>
            <Image
            <Link 
              href="/auth/signin"
              className="group block p-6 bg-gradient-to-br from-gray-50 to-amber-50/30 dark:from-gray-800 dark:to-gray-900 rounded-[20px] border border-border/50 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3 group-hover:scale-110 transition-transform duration-200">👨‍🏫</span>
                <h2 className="text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Per i Docenti
                </h2>
              </div>
              <p className="text-muted-foreground">
                Gestisci le tue classi e monitora i progressi degli studenti
              </p>
            </Link>
          </div>
```

Applicate le stesse classi e stili delle card dell'area amministratore.

Tutte queste modifiche hanno contribuito a creare un'interfaccia più coerente e visivamente accattivante, mantenendo lo stesso stile in tutta l'applicazione.