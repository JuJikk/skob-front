import dbConnect from "@/utils/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await dbConnect();

    try {
        const res = await req.json();
        const user = await User.create(res);
        return NextResponse.json(
            { success: true, data: user },
            { status: 201 }
        );
    } catch (error: any) {
        let errorMessage = 'An unexpected error occurred.';
        let statusCode = 400;

        // Enhanced error logging
        console.error('Error details:', error);

        // Check for specific error types
        if (error.name === 'ValidationError') {
            errorMessage = 'Validation Error: ' + error.message;
            statusCode = 422;
        } else if (error.name === 'MongoServerError' && error.code === 11000) {
            errorMessage = `Duplicate Key Error: A user with the email '${error.keyValue.email}' already exists.`;
            statusCode = 409;
        } else if (error.name === 'SyntaxError') {
            errorMessage = 'Syntax Error: Invalid JSON payload.';
            statusCode = 400;
        } else if (error.name === 'CastError') {
            errorMessage = 'Cast Error: Invalid data type provided.';
            statusCode = 400;
        }

        return NextResponse.json(
            { success: false, message: errorMessage },
            { status: statusCode }
        );
    }
}
