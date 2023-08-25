"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";

export type Payment = {
  id: number;
  role: string;
  isVerified?: boolean;
  username: string;
  email: string;
};

async function handleApprovedYes(rowId: number) {
  const res = await fetch(`/api/users/${rowId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    toast({
      title: "Approved successfully"
    });
  }
  if (!res.ok) {
    toast({
      title: "Not approved"
    });
  }
}
const rowHanlde = (row: any) => {
  console.log(row, "row");
};
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
      );
    },
  },
  {
    accessorKey: "role",
    header: "Status",
  },
  {
    accessorKey: "username",
    header: "User Name",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <>
        <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              {row.original.isVerified ? (
                <Button className="bg-green-500" disabled>
                  Approve
                </Button>
              ) : (
                <Button className="bg-green-500" onClick={() => rowHanlde(row)}>
                  Approve
                </Button>
              )}
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undo.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>No</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleApprovedYes(row.original.id)}
                >
                  Yes
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </>
    ),
  },
];
