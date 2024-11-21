import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { routes } from "@/lib/routes.url";
import { Link, useNavigate } from "react-router-dom";
import { LocalStorage, requestHandler } from "@/lib/helpers";
import { viewallmyLoans } from "@/api";
import Loader from "../Loader";
import { useToast } from "@/hooks/use-toast";
const Index = () => {
  const [loans, setloans] = useState([]);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  useEffect(() => {
    requestHandler(
      async () => await viewallmyLoans(),
      setloading,
      (res) => {
        setloans(res.data.loans), toast;
      }
    );
  }, []);
  const role = LocalStorage.get("role");
  const handleViewLoan = (id) => {
    navigate(`/dashboard/viewloan/${id}`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Your Loans</h1>
        {loans && loans.length > 0 ? (
          <table className="w-full text-left border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Amount</th>
                <th className="border border-gray-300 px-4 py-2">Term</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Created At</th>
                <th className="border border-gray-300 px-4 py-2">Updated At</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan._id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {loan.amount}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {loan.term}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {loan.status}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(loan.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(loan.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleViewLoan(loan._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      View Loan
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No loans available.</p>
        )}
      </div>
      {role === "ADMIN" ? (
        <div className="flex justify-between mt-8 mx-16">
          <div>
            <Link to={`/Dashboard${routes.PENDINGLOANS}`}>
              {" "}
              <Button>View all Unapproved Loans</Button>
            </Link>
          </div>
          <div>
            <Link to={`/Dashboard${routes.VIEWLOANBYUSER}`}>
              <Button>View loan by user</Button>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Index;
