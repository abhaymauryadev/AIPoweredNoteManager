import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route.js";
import { connectDB } from "@/lib/db.js";
import Note from "@/models/Note.js";

// Get all soft-deleted notes for current user
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  await connectDB();

  try {
    const notes = await Note.find({
      userId: session.user.id,
      isDeleted: true,
    }).sort({ deletedAt: -1 });

    return NextResponse.json({ notes }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// Empty trash: permanently delete all soft-deleted notes for current user
export async function DELETE() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  await connectDB();

  try {
    const result = await Note.deleteMany({
      userId: session.user.id,
      isDeleted: true,
    });

    return NextResponse.json({ deletedCount: result.deletedCount }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}


