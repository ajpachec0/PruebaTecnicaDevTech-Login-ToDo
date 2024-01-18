"use client";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import React, { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";

export const TaskContext = createContext({});

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error(`The hook useTask must be used within a TaskProvider
    `);
  }

  return context;
};

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useLocalStorage<TaskType[]>("tasks", []);

  const createTask = (title: string, description: string) => {
    setTasks([...tasks, { title, description, id: uuid() }]);
  };

  const deleteTask = (id: string | number) => {
    setTasks([...tasks.filter((task) => task.id !== id)]);
  };

  const updateTask = (
    id: string,
    newInfo: { title: string; description: string }
  ) => {
    setTasks([
      ...tasks.map((task) => (task.id === id ? { ...task, ...newInfo } : task)),
    ]);
  };

  return (
    <TaskContext.Provider value={{ tasks, createTask, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export type TaskType = {
  id: string;
  title: string;
  description: string;
};
