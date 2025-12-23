import { NextResponse } from "next/server";
import {summarizeText} from "@/services/ai.service.js";

export const dynamic = 'force-dynamic';

export async function POST(req){
    const body = await req.json();
    
    if(!body || !body.content){
        return NextResponse.json({message: "Content is required"}, {status: 400});
    }

    const summary = await summarizeText(body.content);
    return NextResponse.json({summary}, {status: 200});
    
}
