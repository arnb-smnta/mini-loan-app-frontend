import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/useAuthHook";
import { routes } from "./lib/routes.url";
import Dashboard from "./components/dashboard";
import PrivateRoute from "./components/ui/PrivateRoute";
import Main from "./components/dashboard/Main";
import Login from "./components/login";
import Register from "./components/register";
import PublicRoute from "./components/ui/PublicRoute";
import NewLoan from "./components/loan-app/NewLoan";
function App() {
  const { token, user } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          token && user?._id ? (
            <Navigate to={`${routes.DASHBOARD_URL}`} />
          ) : (
            <Navigate to={`${routes.LOGIN_URL}`} />
          )
        }
      />
      <Route
        path={`/Dashboard`}
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      >
        <Route path="app" element={<Main />} />
        <Route
          path={`/Dashboard/${routes.APPLY_FOR_LOAN}`}
          element={<NewLoan />}
        />
      </Route>
      <Route
        path={`${routes.LOGIN_URL}`}
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path={`${routes.REGISTER_URL}`}
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
    </Routes>
  );
}

export default App;