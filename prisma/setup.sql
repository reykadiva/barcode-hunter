-- 1. Create Tables (Prisma Schema)
CREATE SCHEMA IF NOT EXISTS "public";

CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "barcode_number" VARCHAR(20) NOT NULL,
    "product_name" VARCHAR(255) NOT NULL,
    "brand" VARCHAR(255),
    "category" VARCHAR(255),
    "description" TEXT,
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "scan_logs" (
    "id" TEXT NOT NULL,
    "barcode_number" VARCHAR(20) NOT NULL,
    "product_id" TEXT,
    "device_type" VARCHAR(100),
    "scanned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "scan_logs_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "achievements" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "badge_image" TEXT,
    CONSTRAINT "achievements_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "products_barcode_number_key" ON "products"("barcode_number");
CREATE INDEX "products_barcode_number_idx" ON "products"("barcode_number");
CREATE INDEX "scan_logs_barcode_number_idx" ON "scan_logs"("barcode_number");
CREATE INDEX "scan_logs_scanned_at_idx" ON "scan_logs"("scanned_at");

ALTER TABLE "scan_logs" ADD CONSTRAINT "scan_logs_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- 2. Seed Data
INSERT INTO "achievements" ("id", "title", "description", "badge_image") VALUES
('ach_1', 'First Scan', 'Complete your very first barcode scan!', '🎉'),
('ach_2', 'Product Pioneer', 'Register your first product in the database.', '🏅'),
('ach_3', '10 Products Scanned', 'Scan 10 different products.', '🌟'),
('ach_4', '50 Products Scanned', 'Scan 50 different products.', '🏆'),
('ach_5', '100 Products Scanned', 'Scan 100 different products. You''re a legend!', '👑'),
('ach_6', 'Snack Hunter', 'Scan 5 snack products.', '🍿'),
('ach_7', 'Drink Collector', 'Scan 5 drink products.', '🥤'),
('ach_8', 'Candy Lover', 'Scan 5 candy products.', '🍬'),
('ach_9', 'Barcode Master', 'Scan 200 barcodes total.', '📱')
ON CONFLICT DO NOTHING;

INSERT INTO "products" ("id", "barcode_number", "product_name", "brand", "category", "description") VALUES
('prod_1', '8996001600267', 'Chitato Lite BBQ', 'Indofood', 'Snack', 'Crispy potato chips with BBQ flavour, reduced fat version.'),
('prod_2', '8886470100018', 'Pocari Sweat', 'Otsuka', 'Drink', 'Ion supply drink that quickly replenishes lost fluids and ions.'),
('prod_3', '8999999012345', 'Tango Wafer Coklat', 'Garudafood', 'Biscuit', 'Crispy chocolate wafer filled with creamy chocolate cream.'),
('prod_4', '8886998001024', 'Milo Activ-Go', 'Nestle', 'Drink', 'Chocolate malt drink with ACTIV-GO energy mix.'),
('prod_5', '8992775614150', 'Indomie Goreng Original', 'Indofood', 'Instant', 'Indonesian original fried noodles, the most popular instant noodle in Indonesia.')
ON CONFLICT ("barcode_number") DO NOTHING;
