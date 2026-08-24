import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db.js";
import Folder from "@/models/Folder.js";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route.js";

export async function GET(req, { params: paramsPromise }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectDB();
    const { id } = await paramsPromise;

    const folder = await Folder.findOne({ _id: id, userId: session.user.id });
    if (!folder) return NextResponse.json({ message: "Folder not found" }, { status: 404 });

    return NextResponse.json({ folder }, { status: 200 });
}

export async function DELETE(req, { params: paramsPromise }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectDB();
    const { id } = await paramsPromise;

    const deleted = await Folder.findOneAndDelete({ _id: id, userId: session.user.id });
    if (!deleted) return NextResponse.json({ message: "Folder not found" }, { status: 404 });

    return NextResponse.json({ message: "Folder deleted" }, { status: 200 });
}
