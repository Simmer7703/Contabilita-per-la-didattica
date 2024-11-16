import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "TEACHER") {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 })
  }

  try {
    // Verifica che l'invito esista e non sia già stato utilizzato
    const invite = await prisma.invite.findUnique({
      where: { id: params.id }
    })

    if (!invite) {
      return NextResponse.json(
        { error: "Invito non trovato" },
        { status: 404 }
      )
    }

    if (invite.used) {
      return NextResponse.json(
        { error: "Non è possibile revocare un invito già utilizzato" },
        { status: 400 }
      )
    }

    // Elimina l'invito
    await prisma.invite.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ 
      message: "Invito revocato con successo" 
    })
  } catch (error) {
    console.error("Errore durante la revoca dell'invito:", error)
    return NextResponse.json(
      { error: "Si è verificato un errore durante la revoca dell'invito" },
      { status: 500 }
    )
  }
}