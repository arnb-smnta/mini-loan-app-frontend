import { handleloanrepayment, viewloan } from "@/api";
import { requestHandler } from "@/lib/helpers";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import { toast } from "@/hooks/use-toast";
const ViewLoan = () => {
  const { loanId } = useParams();

  const [loan, setloandata] = useState("");
  const [loading, setloading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const handleRepayment = (id) => (e) => {
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

  useEffect(() => {
    requestHandler(
      async () => await viewloan(loanId),
      setloading,
      (res) => {
        setloandata(res.data[0]);
      },
      toast
    );
  }, [refresh]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Loan Details</h1>
        <p>
          <strong>Loan Amount:</strong> {loan?.amount ?? "N/A"}
        </p>
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
                          onClick={() => handleRepayment(5)}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                          Pay
                        </button>
                      </div>
                    ) : (
                      <span>{repayment?.status}</span>
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
    </div>
  );
};

export default ViewLoan;
