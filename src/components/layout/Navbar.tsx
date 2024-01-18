"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <div className="bg-slate-900 flex justify-center sm:justify-between px-8 ">
      {session && (
        <div className="flex  justify-center items-center gap-4 py-8  sm:p-8 order-2">
          <h1 className="text-2xl text-slate-100">
            {/* @ts-ignore */}
            Welcome {session.user?.fullname.split(" ")[0]}
          </h1>
          <button
            onClick={() => signOut()}
            className="bg-indigo-500 px-4 py-2 rounded-md text-white"
          >
            Logout
          </button>
        </div>
      )}

      <div className=" hidden sm:flex justify-between items-center  ">
        <Link href={"/"}>
          <h1 className="text-3xl text-slate-100 font-bold mx-16 text-center w-full">
            To Do App
          </h1>
        </Link>
      </div>
    </div>
  );
};
