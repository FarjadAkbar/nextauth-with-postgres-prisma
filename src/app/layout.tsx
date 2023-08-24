import "./globals.css";
import { NextAuthProvider } from "./providers";
import { Toaster } from "@/components/ui/toaster"

export const metadata = {
  title: "Next Auth with Prisma",
  description: "Next Auth with Prisma and Postgres ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>{children}</NextAuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
