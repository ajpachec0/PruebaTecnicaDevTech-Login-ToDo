"use client";
import React from "react";

import { useSession, signOut } from "next-auth/react";

const DashboardPage = () => {
  const { data: session, status } = useSession();

  console.log(session, status);

  return (
    <div className="h-[calc(100vh)] bg-slate-800 py-4">
      {session && (
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-2xl text-slate-100">
            {/* @ts-ignore */}
            Welcome {session.user?.fullname}
          </h1>
          <p className="text-slate-100">
            You are logged in as {session.user?.email}
          </p>
        </div>
      )}

      <div className="absolute flex-col justify-center items-center gap-4 bottom-8 left-6">
        <button
          onClick={() => signOut()}
          className="bg-slate-400 px-4 py-2 rounded-md text-slate-800"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
