import {NextResponse} from "next/server";
import {suggestTopics} from "@/services/ai.service.js";

export async function POST(req){
    const body = await req.json();
    
    if(!body){
        return NextResponse.json({message: "Content is required"}, {status: 400});
    }

    const suggestions = await suggestTopics(content);
    return NextResponse.json({suggestions}, {status: 200});
    
}