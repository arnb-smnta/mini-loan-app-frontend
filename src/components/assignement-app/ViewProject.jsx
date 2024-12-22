import {
  getproject,
  deleteProject,
  getallUser,
  updateProject,
  assignProjectToUser,
} from "@/api"; // Ensure getallUser and updateProject are imported
import { toast } from "@/hooks/use-toast";
import { LocalStorage, requestHandler } from "@/lib/helpers";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker"; // Assuming you're using a library for date picking
import "react-datepicker/dist/react-datepicker.css"; // Import styles for the date picker

const ViewProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [projectData, setProjectsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [assignedUser, setAssignedUser] = useState(""); // State for assigned user
  const [users, setUsers] = useState([]); // State for user list
  const [startDate, setStartDate] = useState(null); // State for start date
  const [endDate, setEndDate] = useState(null); // State for end date
  const userRole = LocalStorage.get("role");
  const userId = LocalStorage.get("user")._id;

  // Fetch project details
  useEffect(() => {
    requestHandler(
      async () => await getproject(projectId),
      setLoading,
      (res) => {
        setProjectsData(res.data);
        toast({ title: "Project loaded successfully!" });
      },
      (err) => {
        toast({
          title: "Failed to load project",
          description: err.message,
          variant: "destructive",
        });
      }
    );
  }, [projectId]);

  // Fetch users when the dropdown is clicked
  const fetchUsers = async () => {
    requestHandler(
      async () => await getallUser(),
      null,
      (res) => {
        console.log(res.data);
        setUsers(res.data.users);
      },
      (err) => {
        toast({
          title: "Failed to load users",
          description: err.message,
          variant: "destructive",
        });
      }
    );
  };

  // Handle user selection
  const handleUserChange = (e) => {
    setAssignedUser(e.target.value);
  };

  // Handle assigning user to project with dates
  const handleAssignUser = async () => {
    if (!assignedUser || !startDate || !endDate) {
      toast({
        title: "Missing information",
        description: "Please select a user and set start and end dates.",
        variant: "destructive",
      });
      return;
    }

    const data = {
      userid: assignedUser,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    requestHandler(
      async () => await assignProjectToUser(projectId, data),
      null,
      () => {
        toast({ title: "User assigned successfully!" });
        // Optionally refresh project data here
      },
      (err) => {
        console.log(err);
        toast({
          title: "Failed to assign user",
          description: err.description,
          variant: "destructive",
        });
      }
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className="text-center text-red-500">No project data available</div>
    );
  }

  const { name, description, totalScore, taskDetails, scoreByUser } =
    projectData;

  const userScore =
    scoreByUser?.find((score) => score.userID === userId)?.score || 0;

  const progressPercentage = ((userScore / totalScore) * 100).toFixed(2);

  // Handle delete project
  const handleDeleteProject = async () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      requestHandler(
        async () => await deleteProject(projectId),
        null,
        () => {
          toast({ title: "Project deleted successfully!" });
          navigate("/dashboard/viewallprojects"); // Navigate back to dashboard after deletion
        },
        (err) => {
          toast({
            title: "Failed to delete project",
            description: err.message,
            variant: "destructive",
          });
        }
      );
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{name}</h1>
      <p className="text-gray-600 mb-6">{description}</p>

      {userRole === "ADMIN" ? (
        // Admin View
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Total Score: {totalScore}
          </h3>
          <div className="flex items-center mb-4">
            <select
              value={assignedUser}
              onChange={handleUserChange}
              onClick={fetchUsers} // Fetch users when dropdown is clicked
              className="mr-4 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Assign to User</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.username} ({user.email})
                </option>
              ))}
            </select>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="mr-4 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholderText="Start Date"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="mr-4 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholderText="End Date"
            />
            <button
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
              onClick={handleAssignUser}
            >
              Assign
            </button>
            <button
              className="ml-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200"
              onClick={handleDeleteProject}
            >
              Delete Project
            </button>
            <button
              className="ml-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
              onClick={() => navigate(`/dashboard/editproject/${projectId}`)}
            >
              Edit Project
            </button>
            <button
              className="ml-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
              onClick={() => navigate(`/dashboard/addtask/${projectId}`)}
            >
              Add Task
            </button>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Task Details:
          </h3>
          <ul className="space-y-3">
            {taskDetails.map((task) => (
              <li key={task._id}>
                <button
                  className="w-full text-left bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-200"
                  onClick={() => navigate(`/dashboard/viewtask/${task._id}`)}
                >
                  {task.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        // User View
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Total Project Score: {totalScore}
          </h3>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Your Score: {userScore}
          </h3>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Progress: {progressPercentage}%
          </h3>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Task Details:
          </h3>
          <ul className="space-y-3">
            {taskDetails.map((task) => (
              <li key={task._id}>
                <button
                  className="w-full text-left bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-200"
                  onClick={() => navigate(`/dashboard/viewtask/${task._id}`)}
                >
                  {task.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ViewProject;
