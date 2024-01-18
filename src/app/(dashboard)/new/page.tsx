import { TaskContext } from "@/context/TaskContext";
import React, { useContext } from "react";
import { AddNewTask } from "../components/AddNewTask";

const TaskForm = () => {
  return (
    <div className="h-[500px] flex justify-center items-center ">
      <AddNewTask />
    </div>
  );
};

export default TaskForm;
