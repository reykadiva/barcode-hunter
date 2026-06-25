Γùç injected env (5) from .env.local // tip: Γîÿ enable debugging { debug: true }
-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "barcode_number" VARCHAR(20) NOT NULL,
    "product_name" VARCHAR(255) NOT NULL,
    "brand" VARCHAR(255),
    "category" VARCHAR(255),
    "description" TEXT,
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scan_logs" (
    "id" TEXT NOT NULL,
    "barcode_number" VARCHAR(20) NOT NULL,
    "product_id" TEXT,
    "device_type" VARCHAR(100),
    "scanned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "scan_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "achievements" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "badge_image" TEXT,

    CONSTRAINT "achievements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_barcode_number_key" ON "products"("barcode_number");

-- CreateIndex
CREATE INDEX "products_barcode_number_idx" ON "products"("barcode_number");

-- CreateIndex
CREATE INDEX "scan_logs_barcode_number_idx" ON "scan_logs"("barcode_number");

-- CreateIndex
CREATE INDEX "scan_logs_scanned_at_idx" ON "scan_logs"("scanned_at");

-- AddForeignKey
ALTER TABLE "scan_logs" ADD CONSTRAINT "scan_logs_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

