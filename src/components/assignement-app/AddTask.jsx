import { createTask } from "@/api"; // Ensure the correct import statement for the createTask function
import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FaTasks } from "react-icons/fa"; // Changed icon to something more relevant
import { requestHandler } from "@/lib/helpers";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader";

const AddTask = () => {
  const { projectId } = useParams(); // Get the projectId from the URL parameters
  const navigate = useNavigate();
  const { toast } = useToast();
  const [data, setData] = useState({
    name: "",
    description: "",
    score: "", // Changed to an empty string to accept number input
  });
  const [loading, setLoading] = useState(false);

  const handleDataChange = (name) => (e) => {
    e.preventDefault();
    setData({ ...data, [name]: e.target.value });
  };

  const handleCreateTask = async () => {
    if (Object.values(data).some((val) => !val) || isNaN(data.score)) {
      toast({
        variant: "destructive",
        description: "Please enter valid task details including a score",
      });
      return;
    }

    requestHandler(
      async () => await createTask(projectId, data),
      setLoading,
      (res) => {
        navigate(`/dashboard/viewproject/${projectId}`); // Navigate to the project view
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
      handleCreateTask();
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="">
      <div className="flex justify-center items-center flex-col h-screen w-full">
        <h1 className="text-3xl font-bold">Add Task Form</h1>
        <div className="max-w-5xl w-1/2 p-8 flex justify-center items-center gap-5 flex-col bg-dark shadow-md rounded-2xl my-16 border-secondary border-[1px]">
          <h1 className="inline-flex items-center text-2xl mb-4 flex-col">
            <FaTasks className="h-8 w-8 mb-2" /> Add New Task
          </h1>
          {/* Input for entering the task name */}
          <Input
            placeholder="Enter the task name..."
            type="text"
            value={data.name}
            onKeyDown={handleKeyDown}
            onChange={handleDataChange("name")}
          />
          {/* Input for entering the task description */}
          <Input
            placeholder="Enter the task description..."
            type="text"
            value={data.description}
            onChange={handleDataChange("description")}
            onKeyDown={handleKeyDown}
          />
          {/* Input for entering the task score */}
          <Input
            placeholder="Enter the task score..."
            type="number"
            value={data.score}
            onChange={handleDataChange("score")}
            onKeyDown={handleKeyDown}
          />
          {/* Button to initiate the task creation process */}
          <Button
            disabled={
              Object.values(data).some((val) => !val) || isNaN(data.score)
            }
            fullWidth
            onClick={handleCreateTask}
          >
            Create Task
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
