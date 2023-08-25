"use client";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";

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
          toast({
            title: "Fetch error",
            variant: "destructive",
          });
        }

        const jsonData = await res.json();
        setData(jsonData);
      } catch (error) {
        toast({
          title: "Fetch error",
          description: `${error}`,
          variant: "destructive",
        });
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
