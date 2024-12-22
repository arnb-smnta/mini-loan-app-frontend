import { createProject } from "@/api"; // Correct the import statement for the createProject function
import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FaClipboardList } from "react-icons/fa"; // Changed icon to something more relevant
import { requestHandler } from "@/lib/helpers";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

const NewProject = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [data, setData] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleDataChange = (name) => (e) => {
    e.preventDefault();
    setData({ ...data, [name]: e.target.value });
  };

  const handleCreateProject = async () => {
    if (Object.values(data).some((val) => !val)) {
      toast({
        variant: "destructive",
        description: "Please enter both name and description",
      });
      return;
    }

    requestHandler(
      async () => await createProject(data),
      setLoading,
      (res) => {
        navigate(`/dashboard/viewproject/${res.data._id}`); // Navigate to the new project view
      },
      (err) => {
        toast({
          variant: "destructive",
          description: err.description,
        });
      }
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCreateProject();
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="">
      <div className="flex justify-center items-center flex-col h-screen w-full">
        <h1 className="text-3xl font-bold">New Project Form</h1>
        <div className="max-w-5xl w-1/2 p-8 flex justify-center items-center gap-5 flex-col bg-dark shadow-md rounded-2xl my-16 border-secondary border-[1px]">
          <h1 className="inline-flex items-center text-2xl mb-4 flex-col">
            <FaClipboardList className="h-8 w-8 mb-2" /> Create New Project
          </h1>
          {/* Input for entering the project name */}
          <Input
            placeholder="Enter the project name..."
            type="text"
            value={data.name}
            onKeyDown={handleKeyDown}
            onChange={handleDataChange("name")}
          />
          {/* Input for entering the project description */}
          <Input
            placeholder="Enter the project description..."
            type="text"
            value={data.description}
            onChange={handleDataChange("description")}
            onKeyDown={handleKeyDown}
          />
          {/* Button to initiate the project creation process */}
          <Button
            disabled={Object.values(data).some((val) => !val)}
            fullWidth
            onClick={handleCreateProject}
          >
            Create Project
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
