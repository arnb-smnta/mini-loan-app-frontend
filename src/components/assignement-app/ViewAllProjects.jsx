import { viewAllProjects } from "@/api";
import { toast } from "@/hooks/use-toast";
import { LocalStorage, requestHandler } from "@/lib/helpers";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ViewAllProjects = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userRole = LocalStorage.get("role"); // Retrieve the user's role from local storage
  const currentUserId = LocalStorage.get("user")._id; // Retrieve the current user's ID from local storage

  useEffect(() => {
    requestHandler(
      async () => await viewAllProjects(),
      setLoading,
      (res) => {
        setProjectsData(res.data);
        toast({ title: "Projects loaded successfully!" });
      },
      (err) => {
        toast({
          title: "Failed to load projects",
          description: err.description,
          variant: "destructive",
        });
      }
    );
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin w-8 h-8 text-gray-500" />
      </div>
    );
  }

  if (projectsData.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg">
        No projects available.
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">All Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsData.map((project) => (
          <Link
            to={`/dashboard/viewproject/${project._id}`}
            key={project._id}
            className="hover:no-underline"
          >
            <div className="border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition duration-200 cursor-pointer">
              <h2 className="text-xl font-semibold mb-2 truncate">
                {project.name}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {project.description || "No description provided"}
              </p>
              <div className="mb-4">
                <strong>Tasks:</strong>
                <ul className="list-disc list-inside">
                  {project.tasks.length > 0 ? (
                    project.tasks.map((task) => (
                      <li key={task._id} className="truncate">
                        {task.name} - {task.description}
                      </li>
                    ))
                  ) : (
                    <li>No tasks available</li>
                  )}
                </ul>
              </div>
              {userRole === "ADMIN" ? (
                <div className="mb-4">
                  <strong>Scores:</strong>
                  <ul className="list-disc list-inside">
                    {project.scoreByUser.length > 0 ? (
                      project.scoreByUser.map((score) => {
                        // Match userID in scoreByUser with assignedTo userID
                        const assignedUser = project.assignedTo.find(
                          (assigned) => assigned.user._id === score.userID
                        );
                        return (
                          <li key={score.userID}>
                            {assignedUser
                              ? assignedUser.user.email
                              : "Unknown User"}{" "}
                            - Score: {score.score}
                          </li>
                        );
                      })
                    ) : (
                      <li>No scores recorded</li>
                    )}
                  </ul>
                </div>
              ) : (
                <div className="mb-4">
                  <strong>Your Score:</strong>
                  <p>
                    {project.scoreByUser.find(
                      (score) => score.userID === currentUserId
                    )?.score || "No score available"}
                  </p>
                </div>
              )}
              <div>
                <strong>Assigned Users:</strong>
                <ul className="list-disc list-inside">
                  {project.assignedTo.length > 0 ? (
                    project.assignedTo.map((assignment) => (
                      <li key={assignment._id} className="truncate">
                        {assignment.user.email} (
                        {new Date(
                          assignment.userStartDate
                        ).toLocaleDateString()}{" "}
                        -{" "}
                        {new Date(assignment.userEndDate).toLocaleDateString()})
                      </li>
                    ))
                  ) : (
                    <li>No users assigned</li>
                  )}
                </ul>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ViewAllProjects;
