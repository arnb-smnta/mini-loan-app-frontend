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
const getallUser = () => {
  return apiClient.get("/users/");
};

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

//assignement-app -21.12.24

//Task
const createTask = (projectId, data) => {
  return apiClient.post(`assignment/tasks/${projectId}`, data);
};

const getTask = (taskId) => {
  return apiClient.get(`assignment/tasks/t/${taskId}`);
};

const deleteTask = (taskId) => {
  return apiClient.delete(`assignment/tasks/t/${taskId}`);
};

const updateTask = (taskId, data) => {
  return apiClient.patch(`assignment/tasks/t/${taskId}`, data);
};

const updateProgressStatus = (taskId, data) => {
  return apiClient.post(`assignment/tasks/t/${taskId}`, data);
};

//Project Api

const createProject = (data) => {
  return apiClient.post(`assignment/project/`, data);
};

const getproject = (projectId) => {
  return apiClient.get(`assignment/project/${projectId}`);
};

const deleteProject = (projectId) => {
  return apiClient.delete(`assignment/project/${projectId}`);
};

const updateProject = (projectId, data) => {
  return apiClient.patch(`assignment/project/${projectId}`, data);
};

const assignProjectToUser = (projectId, data) => {
  return apiClient.post(`assignment/project/assign/${projectId}`, data);
};

const removeUserFromProject = (projectId, data) => {
  return apiClient.delete(`assignment/project/assign/${projectId}`, data);
};

const viewAllProjects = () => {
  return apiClient.get(`assignment/project/`);
};

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
  createTask,
  getTask,
  deleteTask,
  updateTask,
  updateProgressStatus,
  createProject,
  deleteProject,
  updateProject,
  assignProjectToUser,
  removeUserFromProject,
  getproject,
  viewAllProjects,
  getallUser,
};
