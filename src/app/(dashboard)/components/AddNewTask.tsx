"use client";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TaskType, useTasks } from "@/context/TaskContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters",
  }),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  params?: {
    id: string;
  };
}

export const AddNewTask = ({ params }: Props) => {
  const form = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  console.log(params);

  const router = useRouter();

  const { tasks, createTask, updateTask } = useTasks() as {
    tasks: TaskType[];
    createTask: (title: string, description: string) => void;
    updateTask: (
      id: string,
      updatedTask: { title: string; description: string }
    ) => void;
  };

  const handleSubmit = (data: FormValues) => {
    if (params?.id) {
      updateTask(params.id, data);
    } else {
      createTask(data.title, data.description);
    }

    router.push("/");
  };

  useEffect(() => {
    if (params?.id) {
      const taskInfo = tasks.find((task) => task.id === params.id);
      if (taskInfo) {
        form.setValue("title", taskInfo.title);
        form.setValue("description", taskInfo.description);
      }
    }
  }, [params?.id, tasks, form]);

  return (
    <div className="flex flex-col gap-4 justify-center items-center  ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid gap-4 max-w-[700px] min-w-[300px] md:min-w-[400px] p-8 rounded-md bg-slate-800 shadow-2xl shadow-slate-400"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Title"
                className="bg-slate-900 text-white"
              />
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <Textarea
                {...field}
                placeholder="Description"
                className="bg-slate-900 text-white"
              />
            )}
          />

          <Button type="submit">
            {params?.id ? "Update Task" : "Add Task"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
