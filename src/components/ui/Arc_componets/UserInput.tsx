"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  input: z.string().min(2, {
    message: "Input must be at least 2 characters.",
  }).max(200, {
    message: "Input must not exceed 200 characters.",
  }),
});

interface UserInputProps {
  isDarkMode?: boolean;
}

const UserInput = ({ isDarkMode = true }: UserInputProps) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    // You can add additional logic here, such as API calls
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-6 flex flex-col md:flex-row items-start gap-3">
        <FormField
          control={form.control}
          name="input"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Textarea 
                  placeholder="Enter your research topic" 
                  {...field} 
                  className={`rounded-full w-full p-4 py-3 placeholder:text-sm min-h-12 resize-y ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-400' 
                      : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-500'
                  } border shadow-none transition-colors duration-100`}
                  rows={1}
                />
              </FormControl>
              <FormMessage className="text-red-500 text-xs mt-1" />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className={`${
            isDarkMode
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white rounded-full px-6 py-2 transition-colors duration-300 mt-1`}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default UserInput;