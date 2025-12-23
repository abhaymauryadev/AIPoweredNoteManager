import { NextResponse } from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "../auth/[...nextauth]/route.js";
import {connectDB} from "@/lib/db.js";
import {Note} from "@/models/Note.js";

export async function GET() {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({message: "Unauthorized"}, {status: 401});

        await connectDB();

        try {
            const notes = await Note.find({user: session.user.id}).sort({createdAt: -1});
           
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
            const note = await Note.create({
                title: body.title,
                content: body.content,
                user:session.user.id,
            });
            return NextResponse.json({note}, {status: 201});
        
        } catch (error) {
            return NextResponse.json({message: "Internal Server Error"}, {status: 500});
        }
}