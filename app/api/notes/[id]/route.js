import { NextResponse } from "next/server";
import {connectDB} from "@/lib/db.js"
import {Note} from "@/models/Note.js"


export async function GET(req, {params}){
    await connectDB();

    const note = await Note.findById(params.id);

    if(!note) {
        return NextResponse.json({message: "Note not found"}, {status: 404});
    }

    return NextResponse.json({note}, {status: 200});
}


export async function PUT(req, {params}){
    const body = await req.json();
    await connectDB();

    const updated = await Note.findByIdAndUpdate(
        params.id, 
        body, 
        {new: true}
    );

    return NextResponse.json({updated}, {status: 200});
}

export async function DELETE(req, {params}){
    await connectDB();

    const deleted = await Note.findByIdAndDelete(params.id);

    return NextResponse.json({deleted}, {status: 200});
}
