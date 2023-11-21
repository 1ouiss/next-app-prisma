import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const categories = await prisma.category.findMany({
    include: {
      posts: true,
    },
  });
  return NextResponse.json({
    status: 200,
    data: categories,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const categories = await prisma.category.create({
    data: {
      ...body,
    },
  });

  return NextResponse.json({
    status: 201,
    data: categories,
  });
}
