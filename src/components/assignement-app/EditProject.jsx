import { useEffect, useState } from "react";
import { updateProject, getproject } from "@/api"; // Ensure you import updateProject and getProject functions
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FaEdit } from "react-icons/fa"; // Icon for edit
import { requestHandler } from "@/lib/helpers";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader";

const EditProject = () => {
  const { projectId } = useParams(); // Get projectId from URL parameters
  const navigate = useNavigate();
  const { toast } = useToast();
  const [data, setData] = useState({
    name: "",
    description: "",
    totalScore: "",
  });
  const [loading, setLoading] = useState(true); // Loading state for fetching project data
  const [updating, setUpdating] = useState(false); // Loading state for updating project

  // Fetch the existing project data when the component mounts
  useEffect(() => {
    requestHandler(
      async () => await getproject(projectId),
      setLoading,
      (res) => {
        setData(res.data); // Preload the form fields with existing data
      },
      (err) => {
        toast({
          variant: "destructive",
          description: err.description,
        });
      }
    );
  }, [projectId]);

  const handleDataChange = (name) => (e) => {
    e.preventDefault();
    setData({ ...data, [name]: e.target.value });
  };

  const handleUpdateProject = async () => {
    // Validate that all fields are filled
    if (Object.values(data).some((val) => !val)) {
      toast({
        variant: "destructive",
        description: "Please enter valid project details.",
      });
      return;
    }

    requestHandler(
      async () => await updateProject(projectId, data),
      setUpdating,
      (res) => {
        toast({
          title: "Project updated successfully!",
        });
        navigate(`/dashboard/viewproject/${projectId}`); // Navigate to the project view
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
      handleUpdateProject();
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (updating) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center items-center flex-col h-screen w-full">
      <h1 className="text-3xl font-bold">Edit Project Form</h1>
      <div className="max-w-5xl w-1/2 p-8 flex justify-center items-center gap-5 flex-col bg-dark shadow-md rounded-2xl my-16 border-secondary border-[1px]">
        <h1 className="inline-flex items-center text-2xl mb-4 flex-col">
          <FaEdit className="h-8 w-8 mb-2" /> Edit Project
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
        {/* Input for entering the total score */}
        <Input
          placeholder="Enter the total score..."
          type="number"
          value={data.totalScore}
          onChange={handleDataChange("totalScore")}
          onKeyDown={handleKeyDown}
        />
        {/* Button to initiate the project update process */}
        <Button
          disabled={Object.values(data).some((val) => !val)}
          fullWidth
          onClick={handleUpdateProject}
        >
          Update Project
        </Button>
      </div>
    </div>
  );
};

export default EditProject;
