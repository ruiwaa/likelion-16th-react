import 'dotenv/config'
import { PrismaClient } from '@/generated/prisma'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL ?? 'file:./dev.db',
})

const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV === 'development') {
  globalForPrisma.prisma = prisma
}
export { prisma }
