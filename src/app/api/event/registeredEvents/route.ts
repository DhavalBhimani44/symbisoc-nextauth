import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
    const session = await getServerSession(authOptions)
    try {        
        const userId = session?.user?.id;

        // Fetch events associated with the user, including additional event details
        const events = await prisma.eventRegistration.findMany({
            where: {
                userId: userId
            },
            include: {
                event: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        date: true,
                        time: true,
                        location: true,
                        speaker: true,
                        speakerDesignation: true,
                        organizingClub: true,
                    }
                }
            }
        });

        // Extract the event details from the joined query results
        const formattedEvents = events.map(event => ({
            id: event.event?.id,
            title: event.event?.title,
            description: event.event?.description,
            date: event.event?.date,
            time: event.event?.time,
            location: event.event?.location,
            speaker: event.event?.speaker,
            speakerDesignation: event.event?.speakerDesignation,
            organizingClub: event.event?.organizingClub
        }));

        return NextResponse.json(formattedEvents, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
