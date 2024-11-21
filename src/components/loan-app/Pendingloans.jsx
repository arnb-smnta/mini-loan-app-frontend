import { viewAllUnapprovedLoans } from "@/api";
import { useToast } from "@/hooks/use-toast";
import { requestHandler } from "@/lib/helpers";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import { Link } from "react-router-dom";
const Pendingloans = () => {
  const [loans, setloans] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  console.log(loans);
  useEffect(() => {
    requestHandler(
      async () => await viewAllUnapprovedLoans(),
      setLoading,
      (res) => {
        setloans(res.data);
      },
      toast
    );
  }, []);
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-8">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h2 className="text-3xl font-semibold text-center text-gray-700">
          Loan Details
        </h2>
        {/* Map through the loan array */}
        {loans?.map((loan) => {
          // Extract user data from loan (optional chaining applied)
          const user = loan.userId?.[0];

          return (
            <div
              key={loan._id}
              className="flex flex-col bg-gray-50 p-4 rounded-lg shadow-sm space-y-4"
            >
              <div className="flex justify-between items-center">
                {/* Display User's username */}
                <div className="text-lg font-medium text-gray-800">
                  <Link
                    to={`Dashboard/user/${user?._id}`} // Optional chaining to ensure user exists
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {user?.username || "N/A"}{" "}
                    {/* Optional chaining to safely access username */}
                  </Link>
                </div>
                <div className="text-sm text-gray-500">
                  {/* Display loan status */}
                  <span
                    className={`${
                      loan.status === "PENDING"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {loan.status || "N/A"} {/* Optional chaining for status */}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                {/* Display Amount */}
                <div className="text-lg font-medium text-gray-700">Amount:</div>
                <div className="text-gray-500">{loan.amount || "N/A"}</div>{" "}
                {/* Optional chaining for amount */}
              </div>
              <div className="flex justify-between items-center">
                {/* Display Term */}
                <div className="text-lg font-medium text-gray-700">Term:</div>
                <div className="text-gray-500">
                  {loan.term || "N/A"} months
                </div>{" "}
                {/* Optional chaining for term */}
              </div>
              <div className="mt-4 text-center">
                {/* View Loan Button */}
                <Link
                  to={`/Dashboard/viewloan/${loan._id}`} // Optional chaining to ensure loan exists
                  className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                >
                  View Loan
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pendingloans;
