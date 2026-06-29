import { config } from 'dotenv';
import path from 'path';
config({ path: path.resolve(process.cwd(), '.env.local') });

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🧼 Cleaning up database records...');
  
  const scansResult = await prisma.scanLog.deleteMany({});
  console.log(`Deleted ${scansResult.count} scan logs.`);

  const productsResult = await prisma.product.deleteMany({});
  console.log(`Deleted ${productsResult.count} products.`);

  console.log('✅ Cleanup complete!');
}

main()
  .catch((e) => {
    console.error('❌ Cleanup failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
