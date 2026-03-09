import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const snapshots = await prisma.assetSnapshot.findMany({
      orderBy: { date: "desc" },
    });
    return NextResponse.json(snapshots);
  } catch {
    return NextResponse.json({ error: "DB接続エラー" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { date, totalValue, breakdown } = body;

    if (!date || totalValue === undefined || !breakdown) {
      return NextResponse.json({ error: "必須項目が不足しています" }, { status: 400 });
    }

    const snapshot = await prisma.assetSnapshot.create({
      data: {
        date: new Date(date),
        totalValue: Number(totalValue),
        breakdown: breakdown,
      },
    });
    return NextResponse.json(snapshot, { status: 201 });
  } catch {
    return NextResponse.json({ error: "DB接続エラー" }, { status: 500 });
  }
}
