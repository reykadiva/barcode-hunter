import type { PrismaClient } from '@prisma/client';
import { createPrismaClient } from './create-prisma-client';

declare global {
  var _guestPrisma: PrismaClient | undefined;
}

export const guestPrisma: PrismaClient =
  globalThis._guestPrisma ?? createPrismaClient(process.env.GUEST_DATABASE_URL, 'guest');

if (process.env.NODE_ENV !== 'production') {
  globalThis._guestPrisma = guestPrisma;
}