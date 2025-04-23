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
import { Search } from "lucide-react";

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-4xl mx-auto mt-8 flex flex-col md:flex-row items-start gap-4">
        <FormField
          control={form.control}
          name="input"
          render={({ field }) => (
            <FormItem className="w-full relative">
              <div className="absolute left-5 top-4 text-gray-400">
                <Search size={20} />
              </div>
              <FormControl>
                <Textarea 
                  placeholder="Enter your research topic" 
                  {...field} 
                  className={`rounded-lg w-full p-6 pl-12 py-4 placeholder:text-base h-16 max-h-16 resize-none text-lg ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent' 
                      : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  } border shadow-lg transition-all duration-300 overflow-y-auto`}
                  rows={1}
                />
              </FormControl>
              <FormMessage className="text-red-500 text-xs mt-2 ml-4" />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className={`${
            isDarkMode
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white font-medium rounded-lg px-8 py-4 h-16 text-lg transition-all duration-300 shadow-lg hover:shadow-xl md:mt-0 mt-2`}
        >
          Search
        </Button>
      </form>
    </Form>
  );
};

export default UserInput;