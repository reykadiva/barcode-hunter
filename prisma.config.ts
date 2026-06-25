import { defineConfig } from 'prisma/config';
import { config } from 'dotenv';
import path from 'path';

// Load .env.local explicitly since Next.js standard is .env.local
config({ path: path.resolve(process.cwd(), '.env.local') });

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
