import getCurrentUserRole from "@/lib/data/current-user-role";
import { redirect } from "next/navigation";
import React from "react";
import { DataTable } from "./data-table";
import { Payment, columns } from "./columns";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

const AdminPage = async () => {
  const currentUserRole = await getCurrentUserRole();

  if (currentUserRole === "USER") {
    redirect("/");
  }

  const data = await getData();

  return (
    <>
      <section className="block-space big-container">
        <div>
          <h2>Admin Dashboard</h2>
        </div>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
      </section>
    </>
  );
};

export default AdminPage;
