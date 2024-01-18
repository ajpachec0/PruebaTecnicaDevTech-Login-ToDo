import React from "react";
import { RegisterForm } from "./components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className=" h-[calc(100vh)] w-full flex flex-col justify-center items-center gap-4 bg-slate-900 ">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
