import { adminapprovalforloan, handleloanrepayment, viewloan } from "@/api";
import { LocalStorage, requestHandler } from "@/lib/helpers";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../Loader";
import { toast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
const ViewLoan = () => {
  const { loanId } = useParams();
  const role = LocalStorage.get("role");
  const [loan, setloandata] = useState("");
  const [loading, setloading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleRepayment = async (id, e) => {
    e.preventDefault();
    console.log(id);
    requestHandler(
      async () => await handleloanrepayment(id),
      setloading,
      (res) => {
        setRefresh(!refresh);
      },
      toast
    );
  };

  const approveLoan = async (id, e) => {
    e.preventDefault();
    console.log("ppp");
    requestHandler(
      async () => await adminapprovalforloan(id),
      setloading,
      (res) => {
        setRefresh(!refresh);
      },
      toast
    );
  };
  useEffect(() => {
    requestHandler(
      async () => await viewloan(loanId),
      setloading,
      (res) => {
        setloandata(res.data[0]);
        console.log(res.data);
      },
      toast
    );
  }, [refresh, loanId]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Loan Details</h1>
        <div>
          <p>
            <strong>Loan Amount:</strong> {loan?.amount ?? "N/A"}
          </p>
          <p>
            <strong>Amount due:</strong> {loan?.amountDue ?? "N/A"}
          </p>
        </div>
        <p>
          <strong>Status:</strong> {loan?.status ?? "N/A"}
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-4">Repayments</h2>
        {loan?.repayments?.length > 0 ? (
          <table className="w-full text-left border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Due Date</th>
                <th className="border border-gray-300 px-4 py-2">Amount</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {loan.repayments.map((repayment, index) => (
                <tr key={repayment?._id ?? index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(repayment?.dueDate ?? "").toLocaleDateString() ??
                      "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {repayment?.amount ?? "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {repayment?.status === "PENDING" ? (
                      <div className="flex justify-between">
                        <span>{repayment?.status}</span>
                        <button
                          onClick={(e) => handleRepayment(repayment._id, e)}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                          Pay
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-between">
                        <span>{repayment?.status}</span>
                        <Link to={`/Dashboard/repayment/${repayment._id}`}>
                          <Button>View Details</Button>
                        </Link>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No repayment details available.</p>
        )}
      </div>
      {role === "ADMIN" && loan.status === "PENDING" && (
        <div className="mt-8 flex justify-center">
          <Button
            className="flex justify-center"
            onClick={(e) => approveLoan(loan._id, e)}
          >
            Approve
          </Button>
        </div>
      )}
    </div>
  );
};

export default ViewLoan;
