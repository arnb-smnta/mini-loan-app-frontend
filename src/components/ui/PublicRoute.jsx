import { useAuth } from "@/context/useAuthHook";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
const PublicRoute = ({ children }) => {
  const { token, user } = useAuth();

  if (token && user?._id) return <Navigate to="/dashboard/app" replace />;
  return children;
};

PublicRoute.propTypes = { children: PropTypes.node.isRequired };

export default PublicRoute;
