const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
  const passwordTeacher = await hash('password123', 10)
  const passwordStudent = await hash('password123', 10)

  // Crea un account docente
  const teacher = await prisma.user.upsert({
    where: { email: 'docente@esempio.com' },
    update: {},
    create: {
      email: 'docente@esempio.com',
      name: 'Mario Rossi',
      password: passwordTeacher,
      role: 'TEACHER'
    },
  })

  // Crea un account studente
  const student = await prisma.user.upsert({
    where: { email: 'studente@esempio.com' },
    update: {},
    create: {
      email: 'studente@esempio.com',
      name: 'Luigi Bianchi',
      password: passwordStudent,
      role: 'STUDENT'
    },
  })

  console.log({ teacher, student })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
