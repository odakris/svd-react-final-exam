"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const formSchema = z.object({
  pseudo: z.string().min(5, { message: "Your pseudo must have at least 5 characters" }),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pseudo: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    // console.log(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* PSEUDO */}
            <FormField
              control={form.control}
              name="pseudo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-sx font-bold text-zinc-500 dark:text-white">
                    Pseudo
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      placeholder="Enter Pseudo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link href="./bataille">
              <Button className="w-full my-5 bg-green-950 font-semibold hover:bg-green-800">
                PLAY
              </Button>
            </Link>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
