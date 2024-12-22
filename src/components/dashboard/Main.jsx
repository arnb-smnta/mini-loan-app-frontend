import { Button } from "../ui/button";
import { routes } from "@/lib/routes.url";
import { Link } from "react-router-dom";
import { LocalStorage } from "@/lib/helpers";

const Index = () => {
  const role = LocalStorage.get("role");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Centered Title */}
      <h1 className="text-5xl font-extrabold text-gray-800 mb-8">
        Mini-Assignment App
      </h1>

      {/* Admin-Specific Controls */}
      {role === "ADMIN" && (
        <div className="mt-8">
          <Link to={`/Dashboard${routes.CREATEPROJECT}`}>
            <Button>Create New Project</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Index;
