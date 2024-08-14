import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";

const CreateToDoButton = () => {
  return (
    <Button className="self-start">
      <PlusIcon className="pr-2" />
      Create to do
    </Button>
  );
};

export default CreateToDoButton;
