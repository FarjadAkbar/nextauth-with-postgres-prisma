import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Toaster } from "@/components/ui/toaster";
import Provider from "./context/client-provider";
import "./globals.css";

export const metadata = {
  title: "Next Auth with Prisma",
  description: "Next Auth with Prisma and Postgres ",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        <Provider session={session}>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
