import type { PrismaClient } from '@prisma/client';
import { createPrismaClient } from '@/lib/database/create-prisma-client';

declare global {
  var _prisma: PrismaClient | undefined;
}

export const prisma: PrismaClient =
  globalThis._prisma ?? createPrismaClient(process.env.DATABASE_URL, 'legacy');

if (process.env.NODE_ENV !== 'production') {
  globalThis._prisma = prisma;
}