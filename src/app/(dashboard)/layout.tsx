import { TaskProvider } from "@/context/TaskContext";
import { Navbar } from "../../components/layout/Navbar";
interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className="  ">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8">
        <TaskProvider>{children}</TaskProvider>
      </div>
    </div>
  );
};

export default MainLayout;
