"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Table from "@/components/ui/table"
import { useRouter } from "next/navigation"

interface Business {
  id: number
  name: string
  status: "Pending" | "Active"
}


export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1)
  const columns = [
  {
    text: "Name",
    dataField: "name",
    formatter: (value: any) => value,
  },
];

const data = [
  { name: "Kagoz.com", status: "Pending" },
  { name: "Arouse Fashion Store", status: "Pending" },
  { name: "Haji Cloth Store", status: "Active" },
  { name: "Aarong Eastern Agargaon", status: "Active" },
  { name: "Fashion Exclusive bd", status: "Active" },
];
const route = useRouter();
  return (
    <main className="p-4 lg:p-8">
  

  <Table
  columns={columns}
  data={data}
  loading={false}
  onReload={() => console.log("reload")}
  action={
    <Button
    variant={'submit'}
      className=""
      onClick={() => {
        route.push("/business-dashboard/add-business");
        console.log("Add new");
      }}
    >
      + Add Business
    </Button>
  }
  onEdit={(row) => console.log("edit", row)}
  onDelete={(row) => console.log("delete", row)}
  indexed
  pagination
/>
    </main>
  )
}
