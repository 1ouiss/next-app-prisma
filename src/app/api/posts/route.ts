import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const posts = await prisma.post.findMany({
    include: {
      category: true,
    },
  });
  return NextResponse.json({
    data: posts,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const posts = await prisma.post.create({
    data: {
      ...body,
    },
  });
  return NextResponse.json({
    status: 201,
    data: posts,
  });
}
