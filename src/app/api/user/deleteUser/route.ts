import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/db";

export async function DELETE(req: NextRequest) {
  if (req.method === 'DELETE') {
    try {
      const body = await req.json();
      console.log("User id: ", body.id);

      if (!body.id) {
        return NextResponse.json(
          { message: 'userId is missing in the request body' },
          { status: 400 }
        );
      }

      const userId = body.id;
      console.log("userId: ", userId);

      const registrationData = await prisma.eventRegistration.findMany({
        where: {
          userId: userId,
        }
      });

      if (registrationData.length === 0) {
        await prisma.user.delete({
          where: {
            id: userId,
          },
        });        
      }
      else {

        for (const registration of registrationData) {
          console.log('registration id: ', registration.id);

          await prisma.eventRegistration.delete({
            where: {
              id: registration.id,
            },
          });
        }

        await prisma.user.delete({
          where: {
            id: userId,
          },
        });
      }

      return NextResponse.json(
        { message: 'User deleted successfully' },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error deleting User:', error);
      return NextResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: 'Method Not Allowed' },
      { status: 405 }
    );
  }
}