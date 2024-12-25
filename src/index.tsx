import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./components/styles/index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/Signup";
import Login from "./components/Login";
import { AuthProvider } from "./components/contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Homepage from "./components/HomePage/Homepage";
import { GlobalContextProvider } from "./components/contexts/GlobalContex";
import ProductPage from "./components/global/ProductPage";
import Layout from "./components/global/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/product-page/:id",
        element: <ProductPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <GlobalContextProvider>
        <RouterProvider router={router} />
      </GlobalContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
