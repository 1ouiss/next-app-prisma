import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = +params.id;

  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });
  return NextResponse.json({
    data: post,
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = +params.id;
  const body = await request.json();

  const posts = await prisma.post.update({
    where: {
      id,
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json({
    status: 201,
    data: posts,
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = +params.id;
  //   const body = await request.json();
  const posts = await prisma.post.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    status: 201,
    data: posts,
  });
}
