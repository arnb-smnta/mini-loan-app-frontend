import React from "react";
import { Button } from "../ui/button";
import { routes } from "@/lib/routes.url";
import { Link } from "react-router-dom";

const index = () => {
  return (
    <div>
      <Link to={`/dashboard${routes.APPLY_FOR_LOAN}`}>
        <Button>Apply for a new loan</Button>
      </Link>
    </div>
  );
};

export default index;
