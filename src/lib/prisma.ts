import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Prisma v7 requires an explicit driver adapter.
// We use a lazy getter to avoid construction at import-time during Next.js builds.

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString || connectionString.includes('placeholder')) {
    // Return a no-op client during build time when DB is not configured.
    // All actual DB calls happen at runtime (force-dynamic routes).
    console.warn('[Prisma] DATABASE_URL not configured — returning stub client for build.');
    return {} as PrismaClient;
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

declare global {
  var _prisma: PrismaClient | undefined;
}

export const prisma: PrismaClient =
  globalThis._prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis._prisma = prisma;
}
