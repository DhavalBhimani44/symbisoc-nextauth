import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function DELETE(req: NextRequest) {
  if (req.method === "DELETE") {
    try {
      const body = await req.json();            

      if (!body.id) {
        return NextResponse.json(
          { message: "eventId is missing in the request body" },
          { status: 400 }
        );
      }

      const eventId = body.id;      

      try {
        const registrationData = await prisma.eventRegistration.findMany({
          where: {
            eventId: eventId,
          },
        });        

        if (registrationData.length === 0) {
          await prisma.event.delete({
            where: {
              id: eventId.toString(),
            },
          });
        }

        else {
          for (const registration of registrationData) {
            console.log('registration id: ', registration.id);

            await prisma.eventRegistration.delete({
              where: {
                id: registration.id.toString(),
              },
            });
          }

          await prisma.event.delete({
            where: {
              id: eventId.toString(),
            },
          });
        }

        return NextResponse.json(
          { message: "Event and related registrations deleted successfully" },
          { status: 200 }
        );

      } catch (error) {
        console.error("Error fetching registration data:", error);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }
}
