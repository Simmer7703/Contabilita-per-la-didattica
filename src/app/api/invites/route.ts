import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import crypto from "crypto"
import { z } from "zod"

const inviteSchema = z.object({
  email: z.string().email(),
  role: z.enum(["STUDENT", "TEACHER"])
})

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "TEACHER") {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 })
  }

  try {
    const invites = await prisma.invite.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(invites)
  } catch (error) {
    return NextResponse.json(
      { error: "Errore nel recupero degli inviti" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "TEACHER") {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { email, role } = inviteSchema.parse(body)

    const token = crypto.randomBytes(4).toString("hex")
    
    const invite = await prisma.invite.create({
      data: {
        email,
        token,
        role,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        createdBy: session.user.id
      }
    })

    return NextResponse.json({ 
      message: "Invito creato con successo",
      inviteUrl: `/registrazione/${token}`
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 })
  }
}