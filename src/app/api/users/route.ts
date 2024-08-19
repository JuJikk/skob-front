import dbConnect from "@/utils/mongodb";
import User from "@/models/user";
import {NextRequest, NextResponse} from "next/server";
import { clerkClient } from '@clerk/nextjs/server'

export async function POST(req: Request) {
    await dbConnect();

    try {
        const body = await req.json();
        const email = await clerkClient().users.getUserList({emailAddress: [body.email]});
        if (email.totalCount === 0) {
            throw new Error("EmailNotFound");
        } else if ( email.data[0].publicMetadata.role === "ADMIN" ) {
            throw new Error("AdminException");
        }
        const user = await User.create(body);
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
        } else if (error === 'CastError') {
            errorMessage = 'Cast Error: Invalid data type provided.';
            statusCode = 400;
        } else if (error === 'EmailNotFound') {
            errorMessage = 'Email not found: Invalid data type provided.';
            statusCode = 404;
        } else if (error === 'AdminException') {
            errorMessage = 'Admin Cannot added to Boys: Invalid data type provided.';
            statusCode = 400;
        }

        return NextResponse.json(
            { success: false, message: errorMessage },
            { status: statusCode }
        );
    }
}


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

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 },
            );
        }

        return NextResponse.json({ success: true, data: user }, { status: 200 });
    } catch (error) {
        console.error("Error details:", error);
        return NextResponse.json(
            { success: false, message: "An unexpected error occurred." },
            { status: 500 },
        );
    }
}
