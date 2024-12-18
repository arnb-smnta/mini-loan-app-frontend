import axios from "axios";
import { LocalStorage } from "@/lib/helpers";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI,
  withCredentials: true,
  timeout: 120000,
});

apiClient.interceptors.request.use(
  function (config) {
    //Retrieve user token from local storage
    const token = LocalStorage.get("token");
    //Set authorization header with bearer token

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const loginUser = (data) => {
  return apiClient.post("/users/login", data);
};

const registerUser = (data) => {
  return apiClient.post("/users/register", data);
};

const logoutUser = () => {
  return apiClient.post("/users/logout");
};

const cretaeLoanRequest = (data) => {
  return apiClient.post("/loans/", data);
};

const adminapprovalforloan = (loanId) => {
  return apiClient.post(`/loans/approve/${loanId}`);
};

const viewloan = (loanId) => {
  return apiClient.get(`loans/view/${loanId}`);
};

const handleloanrepayment = (repaymentId) => {
  return apiClient.post(`loans/repayment/${repaymentId}`);
};

const viewRepaymentdetails = (repaymentId) => {
  return apiClient.get(`loans/repayment/${repaymentId}`);
};

const viewallmyLoans = () => {
  return apiClient.get("/loans/viewLoans");
};

const viewAllUnapprovedLoans = () => {
  return apiClient.get("loans/viewUnapprovedLoans");
};

const viewLoansofaparticularuser = (userId) => {
  return apiClient.get(`loans/viewloansOfAUser/:${userId}`);
};

//loan

export {
  loginUser,
  registerUser,
  logoutUser,
  cretaeLoanRequest,
  adminapprovalforloan,
  viewloan,
  handleloanrepayment,
  viewRepaymentdetails,
  viewallmyLoans,
  viewAllUnapprovedLoans,
  viewLoansofaparticularuser,
};
