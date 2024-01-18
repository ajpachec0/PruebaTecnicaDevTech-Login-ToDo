import React from "react";
import { AddNewTask } from "../../components/AddNewTask";

interface Props {
  params: {
    id: string;
  };
}

const EditPage = ({ params }: Props) => {
  console.log(params);
  return (
    <div>
      <AddNewTask params={params} />
    </div>
  );
};

export default EditPage;
