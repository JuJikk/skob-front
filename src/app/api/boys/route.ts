import dbConnect from "../../../utils/mongodb";
import {NextRequest, NextResponse} from "next/server";
import User from "@/models/user";

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
          { success: false, message: "Email query parameter is required" },
          { status: 400 },
      );
    }

    const users = await User.find({ownerEmail: email }).exec();

    if (!users) {
      return NextResponse.json(
          { success: false, message: "Users not found" },
          { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    console.error("Error details:", error);
    return NextResponse.json(
        { success: false, message: "An unexpected error occurred." },
        { status: 500 },
    );
  }
}
