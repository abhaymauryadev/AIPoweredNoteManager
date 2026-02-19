import { NextResponse } from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "../auth/[...nextauth]/route.js";
import {connectDB} from "@/lib/db.js";
import Note from "@/models/Note.js";
import Folder from "@/models/Folder.js";

export async function GET() {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({message: "Unauthorized"}, {status: 401});

        await connectDB();

        try {
            const notes = await Note.find({userId: session.user.id}).sort({createdAt: -1});
            return NextResponse.json({notes}, {status: 200});
        } catch (error) {
            return NextResponse.json({message: "Internal Server Error"}, {status: 500});
        }
}


export async function POST(req){
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({message: "Unauthorized"}, {status: 401});

        const body = await req.json();
        await connectDB();

        try {
            let folderId = body.folderId;
            if (!folderId) {
                let folder = await Folder.findOne({ userId: session.user.id, name: "General" });
                if (!folder) {
                    folder = await Folder.create({ userId: session.user.id, name: "General" });
                }
                folderId = folder._id;
            }

            const note = await Note.create({
                title: body.title,
                content: body.content,
                userId: session.user.id,
                folderId,
                tags: Array.isArray(body.tags) ? body.tags : [],
            });
            return NextResponse.json({note}, {status: 201});
        
        } catch (error) {
            return NextResponse.json({message: "Internal Server Error"}, {status: 500});
        }
}