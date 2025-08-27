"use client"

import { Delete } from "@/components/delete"
import { formSchema } from "@/components/form"
import { Update } from "@/components/update"
import { ColumnDef } from "@tanstack/react-table"
import z from "zod"

export const columns: ColumnDef<z.infer<typeof formSchema>>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "address",
    header: "Address"
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    id: "actions", 
    enableHiding: false, 
    cell: ({row}) => {
      const information = row.original;

      return (
        <div className="flex items-center gap-3">
          <Update information={information}/>
          <Delete id={information.id}/>
        </div>
      )
    }
  }
]
