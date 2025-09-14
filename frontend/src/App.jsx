import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";

import WelcomePage from "./pages/WelcomePage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage";
import LokSabha from "./pages/LokSabha";
import Dashboard from "./pages/Dashboard";
import Analysis from "./pages/Analysis";


const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true,path:"/", element: <WelcomePage /> },       // renders at "/"
      { path: "login", element: <LoginPage /> },   // renders at "/about"
      { path: "analysis", element: <Analysis /> },   // renders at "/about"
      { path: "profile", element: <ProfilePage /> },   // renders at "/about"
      { path: "loksabha", element: <LokSabha /> },   // renders at "/about"
      { path: "Dashboard", element: <Dashboard /> },   // renders at "/about"
    ],
  },  
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
