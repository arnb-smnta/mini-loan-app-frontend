import { cretaeLoanRequest } from "@/api";
import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FaMoneyBill1 } from "react-icons/fa6";
import { requestHandler } from "@/lib/helpers";
import { useNavigate } from "react-router-dom";

const NewLoan = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [data, setData] = useState({
    amount: "",
    term: "",
  });

  const handleDataChange = (name) => (e) => {
    e.preventDefault();
    setData({ ...data, [name]: e.target.value });
  };
  const handleapplyforloan = async () => {
    if (Object.values(data).some((val) => !val)) {
      toast({
        variant: "destructive",
        description: "Please enter both username and password",
      });
      return;
    }
    console.log(data);
    requestHandler(
      async () => await cretaeLoanRequest(data),
      null,
      (res) => {
        navigate("dashboard/");
      },
      toast
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleapplyforloan();
    }
  };

  return (
    <div className="">
      <div className="flex justify-center items-center flex-col h-screen w-full">
        <h1 className="text-3xl font-bold">New loan form</h1>
        <div className="max-w-5xl w-1/2 p-8 flex justify-center items-center gap-5 flex-col bg-dark shadow-md rounded-2xl my-16 border-secondary border-[1px]">
          <h1 className="inline-flex items-center text-2xl mb-4 flex-col">
            <FaMoneyBill1 className="h-8 w-8 mb-2" /> Apply for a loan
          </h1>
          {/* Input for entering the username */}
          <Input
            placeholder="Enter the Loan amount..."
            type="number"
            value={data.username}
            onKeyDown={handleKeyDown}
            onChange={handleDataChange("amount")}
          />
          {/* Input for entering the password */}
          <Input
            placeholder="Enter the term..."
            type="number"
            value={data.password}
            onChange={handleDataChange("term")}
            onKeyDown={handleKeyDown}
          />
          {/* Button to initiate the login process */}
          <Button
            disabled={Object.values(data).some((val) => !val)}
            fullWidth
            onClick={handleapplyforloan}
          >
            Apply for loan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewLoan;
