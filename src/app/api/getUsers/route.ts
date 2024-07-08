import dbConnect from "../../../utils/mongodb";
import User from "../../../models/User";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const users = await User.find({});
    return NextResponse.json(
      { success: true, data: users },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false },
      {
        status: 400,
      },
    );
  }
}
