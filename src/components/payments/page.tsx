import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      username:"peter",
      email:"demo@gmail.com",
      status:"approved"
    },
    {
      id: "2",
      status:"rejected",
      username:"peter",
      email:"demo@gmail.com",
    },
    {
      id: "3",
      status:"approved",
      username:"peter",
      email:"demo@gmail.com",
    },
    {
      id: "4",
      status:"rejected",
      username:"peter",
      email:"demo@gmail.com",
    },

    {
      id: "5",
      status:"approved",
      username:"peter",
      email:"demo@gmail.com",
    },
    {
      id: "6",
      status:"rejected",
      username:"peter",
      email:"demo@gmail.com",
    },
    {
      id: "7",
      status:"approved",
      username:"peter",
      email:"demo@gmail.com",
    },
    {
      id: "8",
      status:"rejected",
      username:"peter",
      email:"demo@gmail.com",
    },
    {
      id: "9",
      status:"rejected",
      username:"peter",
      email:"demo@gmail.com",
    },
    {
      id: "10",
      status:"approved",
      username:"peter",
      email:"demo@gmail.com",
    },
    {
      id: "11",
      status:"rejected",
      username:"peter",
      email:"demo@gmail.com",
    },
    {
      id: "12",
      status:"rejected",
      username:"peter",
      email:"demo@gmail.com",
    },
    {
      id: "13",
      status:"approved",
      username:"peter",
      email:"demo@gmail.com",
    },
    {
      id: "14",
      status:"rejected",
      username:"peter",
      email:"demo@gmail.com",
    },
    // ...
  ];
}

export default async function AdminPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
