import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { STATUS_FORBIDDEN, STATUS_INTERNAL_SERVER_ERROR, STATUS_OK, STATUS_UNAUTHORIZED } from "@/constants";

interface UserData {
  email: string;
  role: string;
}

async function checkAuthorization(email: string): Promise<NextResponse | undefined> {
  const userData: UserData | null = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!userData) {
    return NextResponse.json({ error: "User not found" }, { status: STATUS_UNAUTHORIZED });
  }

  if (userData.role !== "ADMIN") {
    return NextResponse.json({ error: "Access Denied" }, { status: STATUS_FORBIDDEN });
  }

  return undefined; // No authorization issues
}

export async function PUT(req: Request): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: STATUS_UNAUTHORIZED });
    }

    const email = session.user?.email || "";
    const authError = await checkAuthorization(email);
    if (authError) {
      return authError;
    }

    const userId = req.url.split("users/")[1]; // Assuming the id is part of the route query parameter
    const updatedUser = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        isVerified: true,
      },
    });

    return NextResponse.json({ data: updatedUser }, { status: STATUS_OK });
  } catch (error: any) {
    console.error('Error updating users:', error);
    return NextResponse.json({ error: error.message }, { status: STATUS_INTERNAL_SERVER_ERROR });
  }
}
