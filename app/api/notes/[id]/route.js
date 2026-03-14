import { NextResponse } from "next/server";
import {connectDB} from "@/lib/db.js"
import Note from "@/models/Note.js"
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route.js";


export async function GET(req, {params: paramsPromise}){
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({message: "Unauthorized"}, {status: 401});

    await connectDB();
    const params = await paramsPromise;

    const note = await Note.findOne({ _id: params.id, userId: session.user.id });

    if(!note) {
        return NextResponse.json({message: "Note not found"}, {status: 404});
    }

    return NextResponse.json({note}, {status: 200});
}


export async function PUT(req, {params: paramsPromise}){
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({message: "Unauthorized"}, {status: 401});

    const body = await req.json();
    await connectDB();
    const params = await paramsPromise;

    const updated = await Note.findOneAndUpdate(
        { _id: params.id, userId: session.user.id },
        body,
        { new: true }
    );

    if (!updated) {
        return NextResponse.json({message: "Note not found"}, {status: 404});
    }

    return NextResponse.json({updated}, {status: 200});
}

export async function DELETE(req, {params: paramsPromise}){
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({message: "Unauthorized"}, {status: 401});

    await connectDB();
    const params = await paramsPromise;

    const deleted = await Note.findOneAndUpdate(
        { _id: params.id, userId: session.user.id },
        { isDeleted: true, deletedAt: new Date() },
        { new: true }
    );

    if (!deleted) {
        return NextResponse.json({message: "Note not found"}, {status: 404});
    }

    return NextResponse.json({deleted}, {status: 200});
}
