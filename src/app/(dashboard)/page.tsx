"use client";

import { TaskType, useTasks } from "@/context/TaskContext";
import { TaskCard } from "./components/TaskCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  const { tasks } = useTasks() as {
    tasks: TaskType[];
  };

  return (
    <div>
      <Link href="/new">
        <Button className="w-full my-6 hover:bg-slate-950">Add new task</Button>
      </Link>
      <div className="grid  gap-6 pb-16">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
