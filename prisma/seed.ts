import { prisma } from '@/lib/prisma'
import { hashPassword } from 'better-auth/crypto'

async function main() {
  const hashedPassword = await hashPassword('aMTKm@m5Murh')

  const users = [
    { email: 'eric@origin-studio.ch', name: 'Eric' },
    { email: 'thoma@origin-studio.ch', name: 'Thomas' },
    { email: 'chadi@origin-studio.ch', name: 'Chadi' },
  ]

  for (const userData of users) {
    // Créer ou mettre à jour l'utilisateur
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        email: userData.email,
        name: userData.name,
        role: 'admin',
      },
    })

    // Créer le compte credential pour Better Auth
    await prisma.account.upsert({
      where: {
        providerId_accountId: {
          providerId: 'credential',
          accountId: user.id,
        },
      },
      update: {
        password: hashedPassword,
      },
      create: {
        userId: user.id,
        providerId: 'credential',
        accountId: user.id,
        password: hashedPassword,
      },
    })
  }

  console.log('✅ Admin users et accounts créés')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })