import { Button } from "@/components/ui/button";
import { TaskType, useTasks } from "@/context/TaskContext";
import { useRouter } from "next/navigation";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  task: TaskType;
}

export const TaskCard = ({ task }: Props) => {
  const router = useRouter();

  const { deleteTask } = useTasks() as {
    deleteTask: (id: string | number) => void;
  };

  return (
    <div className="bg-slate-900 text-white px-6 py-4 rounded-md grid justify-center items-center grid-cols-3 gap-6 mx-4   ">
      <div className="grid col-span-2 gap-2">
        <h1 className="text-3xl font-bold">{task.title}</h1>
        <p>
          <strong>Description:</strong> {task.description}
        </p>
      </div>
      <div className="gap-2 flex items-center justify-end ">
        <Button
          variant={"ghost"}
          onClick={() => router.push(`/edit/${task.id}`)}
        >
          <MdEdit size={20} color="#F5761A" />
        </Button>
        <Dialog>
          <DialogTrigger>
            <Button variant={"ghost"}>
              <MdDelete size={20} color="#C70000" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="flex flex-col gap-2">
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription className="flex flex-col gap-4">
                This action cannot be undone. This will permanently delete the
                task.
                <Button
                  variant={"destructive"}
                  className="self-end"
                  onClick={() => deleteTask(task.id as string | number)}
                >
                  Confirm
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
