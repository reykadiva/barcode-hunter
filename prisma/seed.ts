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
  console.log('🌱 Seeding database...');

  // Seed achievements
  const achievements = [
    { title: 'First Scan', description: 'Complete your very first barcode scan!', badgeImage: '🎉' },
    { title: 'Product Pioneer', description: 'Register your first product in the database.', badgeImage: '🏅' },
    { title: '10 Products Scanned', description: 'Scan 10 different products.', badgeImage: '🌟' },
    { title: '50 Products Scanned', description: 'Scan 50 different products.', badgeImage: '🏆' },
    { title: '100 Products Scanned', description: "Scan 100 different products. You're a legend!", badgeImage: '👑' },
    { title: 'Snack Hunter', description: 'Scan 5 snack products.', badgeImage: '🍿' },
    { title: 'Drink Collector', description: 'Scan 5 drink products.', badgeImage: '🥤' },
    { title: 'Candy Lover', description: 'Scan 5 candy products.', badgeImage: '🍬' },
    { title: 'Barcode Master', description: 'Scan 200 barcodes total.', badgeImage: '📱' },
  ];

  for (const achievement of achievements) {
    const exists = await prisma.achievement.findFirst({ where: { title: achievement.title } });
    if (!exists) await prisma.achievement.create({ data: achievement });
  }

  // Seed sample products
  const sampleProducts = [
    {
      barcodeNumber: '8996001600267',
      productName: 'Chitato Lite BBQ',
      brand: 'Indofood',
      category: 'Snack',
      description: 'Crispy potato chips with BBQ flavour, reduced fat version.',
      imageUrl: null,
    },
    {
      barcodeNumber: '8886470100018',
      productName: 'Pocari Sweat',
      brand: 'Otsuka',
      category: 'Drink',
      description: 'Ion supply drink that quickly replenishes lost fluids and ions.',
      imageUrl: null,
    },
    {
      barcodeNumber: '8999999012345',
      productName: 'Tango Wafer Coklat',
      brand: 'Garudafood',
      category: 'Biscuit',
      description: 'Crispy chocolate wafer filled with creamy chocolate cream.',
      imageUrl: null,
    },
    {
      barcodeNumber: '8886998001024',
      productName: 'Milo Activ-Go',
      brand: 'Nestle',
      category: 'Drink',
      description: 'Chocolate malt drink with ACTIV-GO energy mix.',
      imageUrl: null,
    },
    {
      barcodeNumber: '8992775614150',
      productName: 'Indomie Goreng Original',
      brand: 'Indofood',
      category: 'Instant',
      description: 'Indonesian original fried noodles, the most popular instant noodle in Indonesia.',
      imageUrl: null,
    },
  ];

  for (const product of sampleProducts) {
    await prisma.product.upsert({
      where: { barcodeNumber: product.barcodeNumber },
      update: product,
      create: product,
    });
  }

  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
