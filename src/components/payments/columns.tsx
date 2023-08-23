"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "../ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  status: string;
  approved?: boolean;
  username: string;
  email: string;
  rejected?: boolean;
};
function handleApprove(id: string) {
  alert(`Row ${id} has been approved.`);
}
function handleRejected(id: string) {
  alert(`Row ${id} has been rejected.`);
}
export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {`ID's`}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "username",
    header: "User Name",
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <>
        <div>
          {row.original.approved ? (
            "Approved"
          ) : (
            <Button
              className="bg-green-500 mr-2"
              onClick={() => handleApprove(row.original.id)}
            >
              Approved
            </Button>
          )}
          {row.original.rejected ? (
            "Rejected"
          ) : (
            <Button
              variant="destructive"
              onClick={() => handleRejected(row.original.id)}
            >
              Rejected
            </Button>
          )}
        </div>
      </>
    ),
  },
];
