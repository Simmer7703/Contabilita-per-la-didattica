import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Crea un utente docente
  const hashedPassword = await hash('password123', 10)
  
  const teacher = await prisma.user.upsert({
    where: { email: 'docente@esempio.com' },
    update: {},
    create: {
      email: 'docente@esempio.com',
      name: 'Docente Test',
      password: hashedPassword,
      role: 'TEACHER'
    },
  })

  console.log({ teacher })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
