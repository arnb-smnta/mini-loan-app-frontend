import { viewRepaymentdetails } from "@/api";
import { useToast } from "@/hooks/use-toast";
import { requestHandler } from "@/lib/helpers";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
const ViewRepaymentSchedule = () => {
  const { repaymentId } = useParams();
  const [loading, setloading] = useState(false);
  const { toast } = useToast();
  const [repayment, setRepaymant] = useState("");
  useEffect(() => {
    requestHandler(
      async () => await viewRepaymentdetails(repaymentId),
      setloading,
      (res) => {
        setRepaymant(res.data);
      },
      toast
    );
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Repayment Details
        </h1>
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-medium text-gray-600">Amount:</span>
            <span className="text-gray-900 font-semibold">
              ₹{repayment?.amount?.toLocaleString() ?? "N/A"}
            </span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-medium text-gray-600">Due Date:</span>
            <span className="text-gray-900">
              {repayment?.dueDate
                ? new Date(repayment?.dueDate).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-medium text-gray-600">Repayment Date:</span>
            <span className="text-gray-900">
              {repayment?.repaymentDate
                ? new Date(repayment?.repaymentDate).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-600">Status:</span>
            <span
              className={`font-semibold ${
                repayment?.status === "PAID" ? "text-green-600" : "text-red-600"
              }`}
            >
              {repayment?.status ?? "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewRepaymentSchedule;
