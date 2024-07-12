import { updateProbaDataInDatabase } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: { json: () => any }) {
  try {
    const body = await req.json();
    const { email, probaType, probaSubType, index, value } = body;

    await updateProbaDataInDatabase(
        email,
      probaType,
      probaSubType,
      index,
      value,
    );

    return NextResponse.json(
      { success: true, message: "Data updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
