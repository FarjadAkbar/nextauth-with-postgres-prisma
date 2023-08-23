import { STATUS_BAD_REQUEST, STATUS_INTERNAL_SERVER_ERROR, STATUS_NOT_FOUND, STATUS_VERIFICATION_REQUIRED } from "@/constants";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";


interface UserExistData {
  username: string;
  email: string;
  role: string;
  isVerified: boolean;
}

async function getUserIfExists(email: string, password: string): Promise<UserExistData | null> {
  const userExist = await prisma.user.findUnique({
    where: {
      email: email,
      },
  });

  if (!userExist || userExist.password !== password) {
    return null;
  }

  return userExist;
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { email, password } = (await req.json()) as {
      email: string;
      password: string;
    };

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: STATUS_BAD_REQUEST });
    }

    if (!password) {
      return NextResponse.json({ error: "Password is required" }, { status: STATUS_BAD_REQUEST });
    }

    const userExist = await getUserIfExists(email, password);

    if (!userExist) {
      return NextResponse.json({ error: "User not found" }, { status: STATUS_NOT_FOUND });
    }

    if (!userExist.isVerified) {
      return NextResponse.json(
        { error: "Admin has not verified this account" },
        { status: STATUS_VERIFICATION_REQUIRED }
      );
    }

    return NextResponse.json(
      {
        user: {
          username: userExist.username,
          email: userExist.email,
          role: userExist.role,
          verified: userExist.isVerified,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error handling user authentication:', error);
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: STATUS_INTERNAL_SERVER_ERROR }
    );
  }
}
