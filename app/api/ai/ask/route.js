import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route.js";
import { askAI } from "@/services/ai.service.js";
import { checkRateLimit } from "@/lib/ai/rateLimit.js";

export const dynamic = 'force-dynamic';

export async function POST(req) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { allowed, resetIn } = checkRateLimit(session.user.id);
    if (!allowed) {
        return NextResponse.json(
            { message: `Rate limit exceeded. Try again in ${Math.ceil(resetIn / 1000)}s.` },
            { status: 429 }
        );
    }

    const body = await req.json();
    if (!body?.prompt) {
        return NextResponse.json({ message: "Prompt is required" }, { status: 400 });
    }

    const answer = await askAI(body.prompt, body.context ?? null);
    return NextResponse.json({ answer }, { status: 200 });
}
