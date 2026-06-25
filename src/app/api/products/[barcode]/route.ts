import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { productUpdateSchema } from '@/lib/validations/product';

export const dynamic = 'force-dynamic';

function serializeProduct(product: any) {
  return {
    ...product,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };
}

type Params = { params: Promise<{ barcode: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { barcode } = await params;

    const product = await prisma.product.findUnique({
      where: { barcodeNumber: barcode },
      include: {
        _count: { select: { scanLogs: true } },
      },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...serializeProduct(product),
        scanCount: product._count.scanLogs,
      },
    });
  } catch (error) {
    console.error('[GET /api/products/[barcode]]', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { barcode } = await params;
    const body = await request.json();
    const parsed = productUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const existing = await prisma.product.findUnique({
      where: { barcodeNumber: barcode },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    const product = await prisma.product.update({
      where: { barcodeNumber: barcode },
      data: parsed.data,
    });

    return NextResponse.json({ success: true, data: serializeProduct(product) });
  } catch (error) {
    console.error('[PUT /api/products/[barcode]]', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const { barcode } = await params;

    const existing = await prisma.product.findUnique({
      where: { barcodeNumber: barcode },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    await prisma.product.delete({ where: { barcodeNumber: barcode } });

    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('[DELETE /api/products/[barcode]]', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
