import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "@/context/useAuthHook";
const PrivateRoute = ({ children }) => {
  const { token, user } = useAuth();

  if (!token || !user?._id) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

PrivateRoute.propTypes = { children: PropTypes.node.isRequired };
export default PrivateRoute;
