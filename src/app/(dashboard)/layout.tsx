import { Navbar } from "../../components/layout/Navbar";
interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div>
      {/* <Navbar /> */}
      {children}
    </div>
  );
};

export default MainLayout;
