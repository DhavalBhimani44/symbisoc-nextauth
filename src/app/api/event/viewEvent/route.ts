import { NextResponse,NextRequest } from "next/server";
import prisma from "@/lib/db";

export async function GET(request: NextRequest) {
    try {
        const events = await prisma.event.findMany();
        return NextResponse.json(events, {status:200});
    } catch (error) {
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}