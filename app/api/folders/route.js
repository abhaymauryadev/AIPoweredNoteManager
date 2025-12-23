import {NextResponse} from "next/server";
import {connectDB} from "@/lib/db.js";
import {Folder} from "@/models/Folder.js";


export async function GET(){
    await connectDB();

    try {
        const folders = await Folder.find()
        return NextResponse.json({folders}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
   


}

export async function POST(req){
    const body = await req.json();
    
    await connectDB();

    try {
        const folder = await Folder.create({
            name: body.name,
            user: body.user
        });
        return NextResponse.json({folder}, {status: 201});
    } catch (error) {
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}