import { useEffect, useState } from "react";
import { updateTask, getTask } from "@/api"; // Ensure you import updateTask and getTask functions
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FaEdit } from "react-icons/fa"; // Icon for edit
import { requestHandler } from "@/lib/helpers";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader";

const EditTask = () => {
  const { taskId } = useParams(); // Get taskId from URL parameters
  const navigate = useNavigate();
  const { toast } = useToast();
  const [data, setData] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(true); // Loading state for fetching task data
  const [updating, setUpdating] = useState(false); // Loading state for updating task

  // Fetch the existing task data when the component mounts
  useEffect(() => {
    requestHandler(
      async () => await getTask(taskId),
      setLoading,
      (res) => {
        setData(res.data.task); // Preload the form fields with existing data
      },
      (err) => {
        toast({
          variant: "destructive",
          description: err.message,
        });
      }
    );
  }, [taskId]);

  const handleDataChange = (name) => (e) => {
    e.preventDefault();
    setData({ ...data, [name]: e.target.value });
  };

  const handleUpdateTask = async () => {
    // Validate that all fields are filled
    if (Object.values(data).some((val) => !val)) {
      toast({
        variant: "destructive",
        description: "Please enter valid task details.",
      });
      return;
    }

    requestHandler(
      async () => await updateTask(taskId, data),
      setUpdating,
      (res) => {
        toast({
          title: "Task updated successfully!",
        });
        navigate(`/dashboard/viewtask/${taskId}`); // Navigate to the task view
      },
      (err) => {
        console.log(err);
        toast({
          variant: "destructive",
          description: err.message,
        });
      }
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleUpdateTask();
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (updating) {
    return <Loader />;
  }

  return (
    <div className="">
      <div className="flex justify-center items-center flex-col h-screen w-full">
        <h1 className="text-3xl font-bold">Edit Task Form</h1>
        <div className="max-w-5xl w-1/2 p-8 flex justify-center items-center gap-5 flex-col bg-dark shadow-md rounded-2xl my-16 border-secondary border-[1px]">
          <h1 className="inline-flex items-center text-2xl mb-4 flex-col">
            <FaEdit className="h-8 w-8 mb-2" /> Edit Task
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
          {/* Button to initiate the task update process */}
          <Button
            disabled={Object.values(data).some((val) => !val)}
            fullWidth
            onClick={handleUpdateTask}
          >
            Update Task
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
