import { STATUS_BAD_REQUEST, STATUS_CONFLICT, STATUS_INTERNAL_SERVER_ERROR } from "@/constants";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";


// Validate required fields
function validateFields(data: any) {
  if (!data.username) {
    return NextResponse.json({ error: "Username is required" }, { status: STATUS_BAD_REQUEST });
  }
  if (!data.email) {
    return NextResponse.json({ error: "Email is required" }, { status: STATUS_BAD_REQUEST });
  }
  if (!data.password) {
    return NextResponse.json({ error: "Password is required" }, { status: STATUS_BAD_REQUEST });
  }
  return null; // No validation errors
}

export async function POST(req: Request) {
  try {
    const { username, email, password } = (await req.json()) as {
      username: string;
      email: string;
      password: string;
    };

    // Validate required fields
    const validationError = validateFields({ username, email, password });
    if (validationError) {
      return validationError;
    }

    const userExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExist) {
      return NextResponse.json({ error: "User already exists" }, { status: STATUS_CONFLICT });
    }

    const hashed_password = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        username,
        email: email.toLowerCase(),
        password: hashed_password,
      },
    });

    return NextResponse.json({
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: STATUS_INTERNAL_SERVER_ERROR }
    );
  }
}
