import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse(
      JSON.stringify({ status: "fail", message: "You are not logged in" }),
      { status: 401 }
    );
  } else{
    const isVerified = session.user.isVerified;
    if (isVerified) {
      return NextResponse.json({
        authenticated: !!session,
        session,
      });
    } else {
      JSON.stringify({ status: "fail", message: "You account is not verified" }),
          { status: 401 }
    }
  }

  return new NextResponse(
      JSON.stringify({ status: "fail", message: "something went wrong" }),
      { status: 401 }
  );
}
