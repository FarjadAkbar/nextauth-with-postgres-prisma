import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Header from "@/components/header.component";
import AdminPage from "@/components/payments/page";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session == null) {
    return redirect("/login");
  } else {
    return (
      <>
        <Header />
        <section className="bg-ct-blue-600 min-h-screen ">
          <div className="container">
          <AdminPage />
          </div>
        </section>
      </>
    );
  }
}
