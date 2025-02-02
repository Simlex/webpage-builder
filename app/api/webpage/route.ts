import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const webpage = await prisma.webpage.findUnique({
      where: { userId },
    });

    if (!webpage) {
      return NextResponse.json({ error: "Webpage not found" }, { status: 404 });
    }

    return NextResponse.json(webpage);
  } catch (error) {
    console.error("Error fetching webpage:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { userId, elements } = await request.json();

  if (!userId || !elements) {
    return NextResponse.json(
      { error: "User ID and elements are required" },
      { status: 400 }
    );
  }

  try {
    const webpage = await prisma.webpage.upsert({
      where: { userId },
      update: { elements },
      create: { userId, elements },
    });

    return NextResponse.json(webpage);
  } catch (error) {
    console.error("Error saving webpage:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
