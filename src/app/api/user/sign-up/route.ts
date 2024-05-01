import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { FormSchema } from "@/lib/validationSchema";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body);

    const validation = FormSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const existingUserByEmail = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (existingUserByEmail) {
      console.log("Email already exists!");
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    const existingUserByPRN = await prisma.user.findUnique({
      where: {
        PRN: body.PRN,
      },
    });

    if (existingUserByPRN) {
      console.log("PRN already exists!");
      return NextResponse.json(
        { message: "PRN already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        PRN: body.PRN,
        hashedPassword: hashedPassword,
        role: body.role,
      },
    });

    return NextResponse.json(
      { user: newUser, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
