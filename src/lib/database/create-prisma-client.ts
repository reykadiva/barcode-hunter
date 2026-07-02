import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

export function createPrismaClient(connectionString: string | undefined, label: string): PrismaClient {
  if (!connectionString || connectionString.includes('placeholder')) {
    console.warn(`[Prisma:${label}] database URL not configured - returning stub client for build.`);
    return {} as PrismaClient;
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}