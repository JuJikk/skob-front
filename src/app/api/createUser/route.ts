import dbConnect from "@/utils/mongodb";
import User from "@/models/User";
import {NextResponse} from "next/server";

export async function POST(
  req: Request,
) {
  await dbConnect();

  try {
      const res = await req.json()
    const user = await User.create(res);
    return NextResponse.json(
        { success: true, data: user },
        {
          status: 201,
        }
    );
  } catch (error) {
    return NextResponse.json(
        { success: false },
        {
          status: 400,
        }
    );
  }
}
