import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { formSchema } from "./form";
import z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "./ui/button";

export const Delete = ({ id }: { id: number | undefined }) => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async (data: Pick<z.infer<typeof formSchema>, "id">) => {
      const res = await axios
        .delete(`/api/information/${data.id}`)
        .then((res) => res.data);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["information"] });
    },
  });

  function handleDelete() {
    toast.promise(mutateAsync({ id: id }), {
      loading: "Deleting...",
      success: (data) => data.text,
      error: (data) => data.error
    });
  }

  return (
    <div>
      <Button variant="destructive" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
};
