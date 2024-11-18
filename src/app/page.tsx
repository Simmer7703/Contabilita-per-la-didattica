import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen gradient-background p-8">
      <div className="max-w-4xl mx-auto">
        <main className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Contabilità Didattica
            </h1>
            <p className="text-muted-foreground text-lg">
              Piattaforma per l'apprendimento della contabilità in partita doppia
            </p>
          </div>

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

          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">
              Caratteristiche Principali
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4">
                <span className="text-3xl mb-2">📚</span>
                <h4 className="text-lg font-medium text-card-foreground">Materiale Didattico</h4>
                <p className="text-muted-foreground">Accesso a contenuti formativi completi</p>
              </div>
              <div className="p-4">
                <span className="text-3xl mb-2">✍️</span>
                <h4 className="text-lg font-medium text-card-foreground">Esercitazioni</h4>
                <p className="text-muted-foreground">Pratica con esercizi interattivi</p>
              </div>
              <div className="p-4">
                <span className="text-3xl mb-2">📊</span>
                <h4 className="text-lg font-medium text-card-foreground">Monitoraggio</h4>
                <p className="text-muted-foreground">Traccia i tuoi progressi nel tempo</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}