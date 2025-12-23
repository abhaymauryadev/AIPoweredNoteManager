import {NextResponse} from "next/server";
import {connectDB} from "@/lib/db.js";
import Folder from "@/models/Folder.js";
import {getServerSession} from "next-auth";
import {authOptions} from "../auth/[...nextauth]/route.js";


export async function GET(){
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({message: "Unauthorized"}, {status: 401});
    
    await connectDB();

    try {
        const folders = await Folder.find({userId: session.user.id});
        return NextResponse.json({folders}, {status: 200})
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
        const folder = await Folder.create({
            name: body.name,
            userId: session.user.id
        });
        return NextResponse.json({folder}, {status: 201});
    } catch (error) {
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}