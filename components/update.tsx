import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { formSchema } from "./form";
import z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

export const Update = ({
  information,
}: {
  information: {
    name: string;
    address: string;
    email: string;
    age: string;
    country: string;
    id?: number | undefined;
  };
}) => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: information.name || "",
      address: information.address || "",
      email: information.email || "",
      age: String(information.age) || "",
      country: information.country || "",
    },
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["information"],
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const res = await axios
        .put(`/api/information/${data.id}`, data)
        .then((res) => res.data);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["information"] });
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast.promise(mutateAsync({ ...data, id: information.id }), {
      loading: "Updating...",
      success: (data) => data.text,
      error: (data) => data.error,
    });
  }

  //for testing purposes we use the dialog but we can reuse the input when updating

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Update</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Message</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your age" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
