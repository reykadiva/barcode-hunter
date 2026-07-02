import type { PrismaClient } from '@prisma/client';
import { createPrismaClient } from './create-prisma-client';

declare global {
  var _arashuPrisma: PrismaClient | undefined;
}

export const arashuPrisma: PrismaClient =
  globalThis._arashuPrisma ?? createPrismaClient(process.env.ARASHU_DATABASE_URL, 'arashu');

if (process.env.NODE_ENV !== 'production') {
  globalThis._arashuPrisma = arashuPrisma;
}