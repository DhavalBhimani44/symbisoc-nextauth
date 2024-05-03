import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function PUT(req: NextRequest) {
    if (req.method === 'PUT') {
        try {
            const { userId, PRN, email, role } = await req.json();
            console.log(PRN, email, role, userId)

            if (!userId) {
                return NextResponse.json(
                    { message: 'Missing userId' },
                    { status: 400 }
                );
            }

            const updatedUser = await prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    PRN: PRN,
                    email: email,
                    role: role,
                },
            });

            return NextResponse.json(
                { message: 'User updated successfully', data: updatedUser },
                { status: 200 }
            );
        } catch (error) {
            console.error('Error updating user:', error);
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