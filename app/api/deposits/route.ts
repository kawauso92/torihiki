import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const deposits = await prisma.depositRecord.findMany({
      orderBy: { date: "desc" },
    });
    return NextResponse.json(deposits);
  } catch {
    return NextResponse.json({ error: "DB接続エラー" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { date, amount, destination, note } = body;

    if (!date || !amount || !destination) {
      return NextResponse.json({ error: "必須項目が不足しています" }, { status: 400 });
    }

    const deposit = await prisma.depositRecord.create({
      data: {
        date: new Date(date),
        amount: Number(amount),
        destination: String(destination),
        note: note ? String(note) : null,
      },
    });
    return NextResponse.json(deposit, { status: 201 });
  } catch {
    return NextResponse.json({ error: "DB接続エラー" }, { status: 500 });
  }
}
