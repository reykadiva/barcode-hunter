import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { scanRequestSchema } from '@/lib/validations/scan';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = scanRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { barcodeNumber, deviceType } = parsed.data;

    // Look up product by barcode
    const product = await prisma.product.findUnique({
      where: { barcodeNumber },
    });

    // Log the scan
    const scanLog = await prisma.scanLog.create({
      data: {
        barcodeNumber,
        productId: product?.id ?? null,
        deviceType: deviceType ?? null,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        found: !!product,
        product: product
          ? {
              ...product,
              createdAt: product.createdAt.toISOString(),
              updatedAt: product.updatedAt.toISOString(),
            }
          : null,
        scanLog: {
          ...scanLog,
          scannedAt: scanLog.scannedAt.toISOString(),
        },
      },
    });
  } catch (error) {
    console.error('[POST /api/scan]', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
