import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from '../../auth/[...nextauth]/route';

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions)
    try {
        const body = await request.json();
        const userId = session?.user?.id;
        
        console.log("user id: ",userId);

        const eventData = await prisma.event.findUnique({
            where: {
                id: body.id
            },
            select: {
                id: true,
                title: true,
                description: true,
                organizingClub: true
            }
        });
        console.log("Event data is: ", eventData)
        const eventId = eventData?.id;

        if (!eventData) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 });
        }

        // Check if the user has already registered for the event
        const existingRegistration = await prisma.eventRegistration.findFirst({
            where: {
                userId: userId,
                eventId: eventId
            }
        });

        if (existingRegistration) {
            return NextResponse.json({ message: "User has already registered for this event" }, { status: 400 });
        }

        // Create the event registration using userId and eventId
        try {
            const newRegistration = await prisma.eventRegistration.create({
                data: {
                    userId: userId,
                    eventId: eventId,
                }
            });
    
            return NextResponse.json({ registration: newRegistration, message: "User registered for event successfully" }, { status: 201 });
        } catch (error) {
            console.log(error)
        }
        
    } catch (error) {
        console.error("An error occurred:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
