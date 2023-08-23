import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = (await req.json()) as {
      email: string;
      password: string;
    };

    if (email === null) {
      throw new Error("Email is required");
    }
  
    if (password === null) {
      throw new Error("Password is required");
    }

    const userExist = await prisma.user.findUnique({
      where: {
        email: email,
        password: password,
      },
    });
  
    if (userExist) {
        if (userExist.isVerified === false) {
            throw new Error("Admin not verified this account");
        }

        return NextResponse.json({
            user: {
              username: userExist.username,
              email: userExist.email,
              role: userExist.role,
              verified: userExist.isVerified
            },
          });
    }

    throw new Error("User not exist");
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
