import Header from "@/components/header.component";
import AdminPage from "@/components/payments/page";
import React from "react";

export default function page() {
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
