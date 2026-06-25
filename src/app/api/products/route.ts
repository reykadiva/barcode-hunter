import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { productCreateSchema } from '@/lib/validations/product';

export const dynamic = 'force-dynamic';

function serializeProduct(product: any) {
  return {
    ...product,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') ?? '';
    const category = searchParams.get('category') ?? '';
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1'));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') ?? '10')));
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { productName: { contains: search, mode: 'insensitive' } },
        { barcodeNumber: { contains: search } },
        { brand: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.category = { equals: category, mode: 'insensitive' };
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: products.map(serializeProduct),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('[GET /api/products]', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = productCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { barcodeNumber, productName, brand, category, description, imageUrl } = parsed.data;

    // Check if barcode already exists
    const existing = await prisma.product.findUnique({
      where: { barcodeNumber },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'A product with this barcode already exists' },
        { status: 409 }
      );
    }

    const product = await prisma.product.create({
      data: {
        barcodeNumber,
        productName,
        brand: brand ?? null,
        category: category ?? null,
        description: description ?? null,
        imageUrl: imageUrl ?? null,
      },
    });

    return NextResponse.json(
      { success: true, data: serializeProduct(product) },
      { status: 201 }
    );
  } catch (error) {
    console.error('[POST /api/products]', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
