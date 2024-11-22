# mini-loan-app-frontend

# Mini Loan App

The **Mini Loan App** is a simple, role-based loan management application designed to provide a seamless user experience for both users and admins.

---

## 📹 **Video Demonstration**

👉 [**Watch the App in Action**](https://drive.google.com/file/d/1KT-uWlWdM5pAFptrj7H_lQP7XYXddtWG/view?usp=drive_link)  
_Click the link to view a walkthrough of the app’s features and functionalities._

---

## 🛠️ **Backend Repository**

The backend for the **Mini Loan App** handles all the logic, data processing, and API routes.  
👉 [**Visit the Backend Repository**](https://github.com/arnb-smnta/mini-loan-app-backend)

# Mini Loan App Frontend

This is the frontend of the **Mini Loan App**, a simple and efficient application designed to manage loan-related operations. Follow the steps below to set up and run the frontend locally.

---

## Prerequisites

Ensure you have the following installed on your system before proceeding:

- [Node.js](https://nodejs.org/) (version 16+ recommended)
- [Git](https://git-scm.com/) (for cloning the repository)

---

## Installation Process

1. **Clone the Repository**  
   Open your terminal and clone the repository:

   ```bash
   git clone <repository-url>
   ```

   Replace `<repository-url>` with the URL of the repository.

2. **Navigate to the Project Directory**  
   Move into the cloned project folder:

   ```bash
   cd mini-loan-app-frontend
   ```

3. **Install Dependencies**  
   Install all required dependencies using npm:

   ```bash
   npm install
   ```

4. **Set Up Environment Variables**  
   Create a `.env` file in the root directory of the project:

   ```bash
   touch .env
   ```

   Open the `.env` file and add the following content:

   ```env
   VITE_SERVER_URI="yourbackend-api/api/v1"
   ```

   Replace `"yourbackend-api/api/v1"` with your backend server's API endpoint. For local development, it should look like:

   ```env
   VITE_SERVER_URI="http://localhost:8080/api/v1"
   ```

---

## Running the Application

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open your browser and navigate to the provided local development URL (typically `http://localhost:5173`).

---

## Additional Commands

- **Build for Production**  
  To create an optimized production build:

  ```bash
  npm run build
  ```

- **Preview Production Build**  
  To preview the production build locally:
  ```bash
  npm run preview
  ```

---

## Troubleshooting

- Ensure your backend API is running and accessible at the `VITE_SERVER_URI` you provided in the `.env` file.
- If there are dependency errors, delete the `node_modules` folder and run `npm install` again:
  ```bash
  rm -rf node_modules
  npm install
  ```

---

Feel free to reach out if you encounter any issues or have questions regarding the installation process. Enjoy building with Mini Loan App! 🎉

# Mini Loan App

The **Mini Loan App** is designed to provide users and admins with role-based access to manage loan-related functionalities. Here's an overview of its features, along with details about the login page, user dashboard, and admin functionalities.

---

## ⚙️ Special Note

- By default, users registering through the **Register Page** are assigned the role of `user`.
- If you want to assign the `admin` role, it must be done directly by calling the backend API using tools like **Postman**. This measure ensures the security of the app.
- However, you can choose to modify the **Register Page** to include a **role selection dropdown**. If implemented, you will need to send a `role` parameter along with `username`, `email`, and `password` in the backend request.

---

## 🌟 Features

### **Login Page**

The entry point of the app. Users can log in using their credentials to access either the **User Dashboard** or the **Admin Dashboard**, based on their assigned role.

![Login Page](https://res.cloudinary.com/dxfdxwvlm/image/upload/v1732205373/mini-loan-app-login_xicxml.png "Login Page")

---

### **Admin Dashboard**

Admins have access to special features like **viewing unapproved loans** and **viewing loans by specific users**.

![Admin Dashboard](https://res.cloudinary.com/dxfdxwvlm/image/upload/v1732205372/admin_dashboard_f2elcs.png "Admin Dashboard")

---

### **User Dashboard**

The **User Dashboard** provides access to basic loan functionalities, excluding administrative controls like approving loans.

![User Dashboard](https://res.cloudinary.com/dxfdxwvlm/image/upload/v1732205373/user_dashboard_ngjc30.png "User Dashboard")

---

## 📝 Admin-Only Features

### **Unapproved Loan Page**

Admins can view all pending loans requiring approval.

![Unapproved Loan Page](https://res.cloudinary.com/dxfdxwvlm/image/upload/v1732205372/admin_unapprovedLoan_panel_hc6jmh.png "Unapproved Loan Page")

---

### **Approve Loan Functionality**

Admins get access to a special **Approve Loan** button for pending loans.

![Admin Loan Page](https://res.cloudinary.com/dxfdxwvlm/image/upload/v1732205373/admin_pending_loan_viewLoan_ofb3x0.png "Admin Loan Page")

---

## 📝 User Loan View

When viewing loans, users can see the loan status (e.g., **Pending**), but they lack access to the **Approve Loan** button, ensuring role-based restrictions.

![User Loan Page](https://res.cloudinary.com/dxfdxwvlm/image/upload/v1732205373/user_viewLoan_tilqad.png "User Loan Page")

---

This app ensures proper role-based access while allowing room for developer customization. Choose your preferred approach to manage user roles and let this app handle loans efficiently! 🚀
