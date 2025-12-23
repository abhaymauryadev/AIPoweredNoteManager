import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db.js"
import { Note } from "@/models/Note.js"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route.js";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    await connectDB();
    const session = await getServerSession(authOptions);
    try {
        const notes = await Note.find({
            title: { $regex: query, $options: "i" },
            user: session.user.id
        })
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}