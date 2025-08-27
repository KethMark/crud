"use client"

import React from 'react'
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import z from 'zod';
import { formSchema } from '@/components/form';
import { DataTable } from './data-table';
import { columns } from './columns';

const Information = () => {
  
  const { data }  = useQuery({
    queryKey: ["information"],
    queryFn: async (): Promise<z.infer<typeof formSchema>[]> => {
      const res = await axios.get('/api/information').then((res) => res.data)
      return res
    }
  })
  
  return (
    <div className="w-full">
      <div className="p-10">
        {data && <DataTable columns={columns} data={data}/>}
      </div>
    </div>
  )
}

export default Information