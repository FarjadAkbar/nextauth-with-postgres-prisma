import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

  
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  } else{
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

  const users = await prisma.user.findMany({
    where: {
      role: "USER",
    },
  });
  

  return users;
}
