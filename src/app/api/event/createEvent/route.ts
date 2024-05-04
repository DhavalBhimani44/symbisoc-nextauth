import prisma from '@/lib/db'
import { sendUpcomingEventMail } from '@/lib/mailer';
import { NextRequest,NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log(body);

        const newEvent = await prisma.event.create({
            data: {
                title: body.title,
                description: body.description,
                organizingClub: body.organizingClub,
                date: body.date,
                time: body.time,
                location: body.location,
                speaker: body.speaker,
                speakerDesignation: body.speakerDesignation,
            },
        });

        const organizingClub = body.organizingClub;
        const emailType = "NEWEVENT";
        const eventName = body.title;
        const eventDate = body.date;
        const eventTime = body.time;
        const eventVenue = body.location;
        const speakerName = body.speaker;
        const speakerDesignation = body.speakerDesignation;

        const emailResponse = await sendUpcomingEventMail({emailType, organizingClub, eventName, eventDate, eventTime, eventVenue
        , speakerName, speakerDesignation});
        console.log("Upcoming event details: ", emailResponse);

        return NextResponse.json({ event: newEvent, message: "Event created successfully" }, {status: 201});
    } catch (error) {
        console.error("An error occured:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}