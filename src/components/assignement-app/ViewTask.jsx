import { getTask, updateProgressStatus, deleteTask } from "@/api"; // Ensure `deleteTask` is imported
import { toast } from "@/hooks/use-toast";
import { LocalStorage, requestHandler } from "@/lib/helpers";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const TaskEnumStatus = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
};

const ViewTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate(); // Use for navigation
  const [taskData, setTaskData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const userRole = LocalStorage.get("role"); // Retrieve user role from local storage

  useEffect(() => {
    requestHandler(
      async () => await getTask(taskId),
      setLoading,
      (res) => {
        console.log(res.data);
        setTaskData(res.data);
        setSelectedStatus(res.data?.userProgress?.status); // Set initial status for the dropdown
        toast({ title: "Task loaded successfully!" });
      },
      (err) => {
        toast({
          title: "Failed to load Task",
          description: err.message,
          variant: "destructive",
        });
      }
    );
  }, [taskId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!taskData) {
    return (
      <div className="text-center text-red-500">No task data available</div>
    );
  }

  const { task, userProgress } = taskData;

  // Handler functions
  const handleEditTask = () => {
    navigate(`/dashboard/edittask/${taskId}`);
  };

  const handleProgressChange = (newStatus) => {
    if (selectedStatus === TaskEnumStatus.COMPLETED) {
      toast({
        title: "Cannot update status",
        description: "Task progress is already marked as COMPLETED.",
        variant: "destructive",
      });
      return;
    }

    requestHandler(
      async () => await updateProgressStatus(taskId, { status: newStatus }),
      setLoading,
      (res) => {
        setSelectedStatus(newStatus);
        toast({ title: `Progress updated to ${newStatus}` });
      },
      (err) => {
        toast({
          title: "Failed to update progress",
          description: err.message,
          variant: "destructive",
        });
      }
    );
  };

  const handleDeleteTask = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      requestHandler(
        async () => await deleteTask(taskId),
        setLoading,
        () => {
          toast({ title: "Task deleted successfully!" });
          navigate("/dashboard/viewallprojects"); // Navigate back to the dashboard after deletion
        },
        (err) => {
          toast({
            title: "Failed to delete task",
            description: err.message,
            variant: "destructive",
          });
        }
      );
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{task.name}</h1>
      <p className="text-gray-600 mb-6">{task.description}</p>
      <p className="text-gray-800 mb-6">
        <span className="font-semibold">Score:</span> {task.score}
      </p>

      {userRole === "ADMIN" ? (
        // Admin View
        <div>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            onClick={handleEditTask}
          >
            Edit Task
          </button>
          <button
            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 ml-4"
            onClick={handleDeleteTask}
          >
            Delete Task
          </button>
        </div>
      ) : (
        // User View
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Your Progress: {userProgress?.status}
          </h3>
          <div className="mb-4">
            <label
              htmlFor="progress"
              className="block text-gray-700 font-medium mb-2"
            >
              Update Progress
            </label>
            <select
              id="progress"
              value={selectedStatus}
              onChange={(e) => handleProgressChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              disabled={selectedStatus === TaskEnumStatus.COMPLETED}
            >
              {Object.values(TaskEnumStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTask;
