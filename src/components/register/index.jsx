import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/useAuthHook";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const { toast } = useToast();
  // State to manage user registration data
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [message, setMessage] = useState();
  // Access the register function from the authentication context
  const { register } = useAuth();

  // Handle data change for input fields
  const handleDataChange = (name) => (e) => {
    // Update the corresponding field in the data state
    setData({
      ...data,
      [name]: e.target.value,
    });
  };

  // Handle user registration
  const handleRegister = async () => {
    if (Object.values(data).some((val) => !val)) {
      toast({ variant: "destructive", description: "Enter all the values" });
      return;
    }

    await register(data);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleRegister();
    }
  };
  return (
    // Register form UI
    <div className="flex justify-center items-center flex-col h-screen w-full">
      <h1 className="text-3xl font-bold">SplitBills-site</h1>
      <div className="max-w-5xl w-1/2 p-8 flex justify-center items-center gap-5 flex-col bg-dark shadow-md rounded-2xl my-16 border-secondary border-[1px]">
        <h1 className="inline-flex items-center text-2xl mb-4 flex-col">
          {/* Lock icon */}
          <FaLock className="h-8 w-8 mb-2" /> Register
        </h1>
        {/* Input fields for username, password, and email */}
        <Input
          placeholder="Enter the email..."
          type="email"
          value={data.email}
          onChange={handleDataChange("email")}
          onKeyDown={handleKeyDown}
        />
        <Input
          placeholder="Enter the username..."
          value={data.username}
          onChange={handleDataChange("username")}
          onKeyDown={handleKeyDown}
        />
        <Input
          placeholder="Enter the password..."
          type="password"
          value={data.password}
          onChange={handleDataChange("password")}
          onKeyDown={handleKeyDown}
        />
        {/* Register button */}
        <Button
          fullWidth
          disabled={Object.values(data).some((val) => !val)}
          onClick={handleRegister}
        >
          Register
        </Button>
        {/* Login link */}
        <small className="text-zinc-300">
          Already have an account?{" "}
          <a className="text-primary hover:underline" href="/login">
            Login
          </a>
        </small>
      </div>
    </div>
  );
};

export default Register;
