"use client";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [data, setData] = useState<Payment[]>();
  useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        const res = await fetch("/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Fetch failed");
        }

        const jsonData = await res.json();
        setData(jsonData);
      } catch (error) {
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      {data ? (
        <DataTable
          columns={columns}
          //@ts-ignore
          data={data.data}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
