"use client";
import { useRouter } from "next/navigation";
import Header from "@/components/header.component";
import AdminPage from "@/components/payments/page";
import { useSession } from "next-auth/react";

export default  function Page() {
  const { data: session } = useSession()
  const router = useRouter()

  if (session === null) {
    return router.push("/login");
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
