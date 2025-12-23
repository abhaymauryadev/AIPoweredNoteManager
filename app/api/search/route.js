import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db.js"
import Note from "@/models/Note.js"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route.js";

export async function GET(req) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({message: "Unauthorized"}, {status: 401});
    
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    await connectDB();
    try {
        const notes = await Note.find({
            title: { $regex: query, $options: "i" },
            userId: session.user.id
        });
        return NextResponse.json({notes}, {status: 200});
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}