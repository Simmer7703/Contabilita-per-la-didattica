import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { z } from "zod"

const registerSchema = z.object({
  name: z.string().min(2, "Il nome deve contenere almeno 2 caratteri"),
  email: z.string().email("Email non valida"),
  password: z.string().min(8, "La password deve contenere almeno 8 caratteri"),
  token: z.string()
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password, token } = registerSchema.parse(body)

    // Verifica il token di invito
    const invite = await prisma.invite.findFirst({
      where: {
        token,
        used: false,
        expires: {
          gt: new Date()
        }
      }
    })

    if (!invite) {
      return NextResponse.json(
        { error: "Token di invito non valido o scaduto" },
        { status: 400 }
      )
    }

    // Verifica che l'email corrisponda
    if (invite.email !== email) {
      return NextResponse.json(
        { error: "L'email non corrisponde a quella dell'invito" },
        { status: 400 }
      )
    }

    // Crea l'utente
    const hashedPassword = await hash(password, 12)
    
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: invite.role
      }
    })

    // Marca l'invito come utilizzato
    await prisma.invite.update({
      where: { id: invite.id },
      data: { used: true }
    })

    return NextResponse.json({ message: "Utente registrato con successo" })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error("Errore durante la registrazione:", error)
    return NextResponse.json(
      { error: "Si è verificato un errore durante la registrazione" },
      { status: 500 }
    )
  }
}