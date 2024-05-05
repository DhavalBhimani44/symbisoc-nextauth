import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from '../../auth/[...nextauth]/route';

export async function POST(request: NextRequest) {    
    try {
        const body = await request.json();
        const userId = body.id;
        const eventId = body.eventId;
        
        console.log("user id: ",userId);   
        console.log("event id: ", eventId);

        // Check if the user has already registered for the event
        const existingRegistration = await prisma.eventAttendees.findFirst({
            where: {
                userId: userId,
                eventId: eventId
            }
        });

        if (existingRegistration) {
            return NextResponse.json({ message: "User has already been added to attendes list" }, { status: 400 });
        }

        // Create the event registration using userId and eventId
        try {
            const newAttendee = await prisma.eventAttendees.create({
                data: {
                    userId: userId,
                    eventId: eventId,
                }
            });
    
            return NextResponse.json({ registration: newAttendee, message: "User attended successfully" }, { status: 201 });
        } catch (error) {
            console.log(error)
        }
        
    } catch (error) {
        console.error("An error occurred:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}