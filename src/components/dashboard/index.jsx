import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { LocalStorage, requestHandler } from "@/lib/helpers";
import { logoutUser } from "@/api";
import Loader from "../Loader";
import { routes } from "@/lib/routes.url";
const Index = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleLogout = (e) => {
    e.preventDefault();
    requestHandler(
      async () => await logoutUser(),
      setLoading,
      (res) => {
        LocalStorage.clear();
        navigate("/login");
      }
    );
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="shadow-xl bg-white">
      <div className="flex justify-between mx-24 mt-6">
        <div className="flex justify-between">
          <Link to={`/dashboard${routes.VIEWALLPROJECTS}`}>
            <Button>View All projects</Button>
          </Link>
        </div>

        <div>
          <Link to="/Dashboard/app">
            <Button>Home</Button>
          </Link>
        </div>
        <div>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Index;
