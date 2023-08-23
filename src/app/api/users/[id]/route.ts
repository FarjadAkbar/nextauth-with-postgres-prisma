import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  } else {
    const email = session.user?.email || "";
    const userData = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userData && userData.role !== "ADMIN") {
      throw new Error("Access Denied");
    }
  }

  const userId = req.url.split("users/")[1]; // Assuming the id is part of the route query parameter
  const updatedUser = await prisma.user.update({
    where: {
      id: Number(userId), // Convert the id to a number if needed
    },
    data: {
      isVerified: true, // Update the property you want
    },
  });

  return updatedUser;
}
