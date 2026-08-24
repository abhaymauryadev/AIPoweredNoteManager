import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route.js";
import { summarizeText } from "@/services/ai.service.js";
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
    if (!body?.content) {
        return NextResponse.json({ message: "Content is required" }, { status: 400 });
    }

    const summary = await summarizeText(body.content);
    return NextResponse.json({ summary }, { status: 200 });
}
