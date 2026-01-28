import { PrismaClient } from '@prisma/client'

// Déclare un objet global pour stocker l'instance PrismaClient afin d'éviter les doublons en mode développement
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Exporte une instance unique de PrismaClient
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma