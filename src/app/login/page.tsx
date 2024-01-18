import React from "react";
import { LoginForm } from "./components/LoginForm";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

const LoginPage = () => {
  return (
    <div className=" h-[calc(100vh)] w-full flex flex-col justify-center items-center gap-4 bg-slate-900 ">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
