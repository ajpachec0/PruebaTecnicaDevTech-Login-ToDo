"use client";
import {
  LoginRequestType,
  LoginRequestValidation,
} from "@/app/api/auth/validations/login.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const RegisterForm = () => {
  const [error, setError] = useState();
  const router = useRouter();
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const form = useForm<LoginRequestType>({
    defaultValues: {
      email: "",
      password: "",
      fullname: "",
    },
    resolver: zodResolver(LoginRequestValidation),
  });

  const handleSubmit = async (data: LoginRequestType) => {
    try {
      const signUpResponse = await axios.post("/api/auth/signup", {
        email: data.email,
        password: data.password,
        fullname: data.fullname,
      });

      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.ok) {
        router.push("/");
        toast.success("Account created successfully");
      }

      form.reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid place-items-center gap-4  p-8 rounded-md min-w-[300px] md:min-w-[400px] bg-slate-800 shadow-2xl shadow-slate-400"
      >
        <h1 className="text-3xl text-white">Register</h1>

        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-white">Full name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-white">Email</FormLabel>
              <FormControl>
                <Input placeholder="example@test.com" {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-white">Password</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-indigo-600 px-4 py-2 hover:bg-indigo-900"
        >
          Submit
        </Button>

        <span className="text-white text-xs">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            Login
          </a>
        </span>
      </form>
    </Form>
  );
};
