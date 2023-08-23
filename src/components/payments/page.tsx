"use client";
import { prisma } from "@/lib/prisma";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";

// async function getData(): Promise<Payment[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "1",
//       username:"peter",
//       email:"demo@gmail.com",
//       status:"approved"
//     },
//     {
//       id: "2",
//       status:"rejected",
//       username:"peter",
//       email:"demo@gmail.com",
//     },
//     {
//       id: "3",
//       status:"approved",
//       username:"peter",
//       email:"demo@gmail.com",
//     },
//     {
//       id: "4",
//       status:"rejected",
//       username:"peter",
//       email:"demo@gmail.com",
//     },

//     {
//       id: "5",
//       status:"approved",
//       username:"peter",
//       email:"demo@gmail.com",
//     },
//     {
//       id: "6",
//       status:"rejected",
//       username:"peter",
//       email:"demo@gmail.com",
//     },
//     {
//       id: "7",
//       status:"approved",
//       username:"peter",
//       email:"demo@gmail.com",
//     },
//     {
//       id: "8",
//       status:"rejected",
//       username:"peter",
//       email:"demo@gmail.com",
//     },
//     {
//       id: "9",
//       status:"rejected",
//       username:"peter",
//       email:"demo@gmail.com",
//     },
//     {
//       id: "10",
//       status:"approved",
//       username:"peter",
//       email:"demo@gmail.com",
//     },
//     {
//       id: "11",
//       status:"rejected",
//       username:"peter",
//       email:"demo@gmail.com",
//     },
//     {
//       id: "12",
//       status:"rejected",
//       username:"peter",
//       email:"demo@gmail.com",
//     },
//     {
//       id: "13",
//       status:"approved",
//       username:"peter",
//       email:"demo@gmail.com",
//     },
//     {
//       id: "14",
//       status:"rejected",
//       username:"peter",
//       email:"demo@gmail.com",
//     },
//     // ...
//   ];
// }

export default function AdminPage() {
  const [data, setData] = useState<Payment[]>();
  console.log(data,"dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
        console.log(jsonData, "datadatadatadata");
      } catch (error) {
        console.error("Fetch error:", error);
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
