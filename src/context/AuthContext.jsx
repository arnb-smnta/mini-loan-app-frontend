import { loginUser, logoutUser, registerUser } from "@/api";
import { LocalStorage, requestHandler } from "@/lib/helpers";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/Loader";
const AuthContext = createContext({
  user: null,
  token: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

//Creating a hook to access the auth context

//Create a component that provides authentication related data and functions

const AuthProvider = ({ children }) => {
  const [isLoading, setisLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const { toast } = useToast();

  const navigate = useNavigate();

  const login = async (data) => {
    requestHandler(
      async () => await loginUser(data),
      setisLoading,

      (res) => {
        const { data } = res;
        setUser(data.user);
        setToken(data.accessToken);
        LocalStorage.set("user", data.user);
        LocalStorage.set("token", data.accessToken);
        LocalStorage.set("role", data.user.role);
        navigate("/dashboard/app"); // Redirect to the chat page after successful login
      },
      toast
    );
  };

  const register = async (data) => {
    await requestHandler(
      async () => registerUser(data),
      setisLoading,
      () => {
        alert("Account created succesfully,Go ahead and login");
        navigate("/login");
      },
      toast
    );
  };

  const logout = async () => {
    await requestHandler(
      async () => logoutUser(),
      setisLoading,
      () => {
        setUser(null), setToken(null), LocalStorage.clear(), navigate("/login");
      },
      toast
    );
  };

  useEffect(() => {
    setisLoading(true);
    const _token = LocalStorage.get("token");
    const _user = LocalStorage.get("user");

    if (_token && _user._id) {
      setUser(_user);
      setToken(_token);
    }
    setisLoading(false);
  }, []);

  //Check for saved user and token in local storage during component initialization

  return (
    <AuthContext.Provider value={{ user, login, register, logout, token }}>
      {isLoading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
