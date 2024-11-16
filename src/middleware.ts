import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Permetti sempre l'accesso alla pagina di registrazione
  if (request.nextUrl.pathname.startsWith('/registrazione/')) {
    return NextResponse.next()
  }

  // Permetti l'accesso alle pagine pubbliche
  if (request.nextUrl.pathname === '/') {
    return NextResponse.next()
  }

  // Se l'utente è sulla pagina di autenticazione
  if (request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.next()
  }

  // Proteggi tutte le altre rotte
  const token = request.cookies.get('next-auth.session-token')
  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}