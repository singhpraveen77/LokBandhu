import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";

import WelcomePage from "./pages/WelcomePage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage";
import LokSabha from "./pages/LokSabha";
// import CreatePostModal from "./pages/CreatePost";
import Dashboard from "./pages/Dashboard";
//test1

//rajm/devqwq
//test3changed



const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true,path:"/", element: <WelcomePage /> },       // renders at "/"
      { path: "loginpage", element: <LoginPage /> },   // renders at "/about"
      { path: "profile", element: <ProfilePage /> },   // renders at "/about"
      { path: "loksabha", element: <LokSabha /> },   // renders at "/about"
      // { path: "createPost", element: <CreatePostModal /> },   // renders at "/about"
      { path: "Dashboard", element: <Dashboard /> },   // renders at "/about"
      // add more nested routes here
    ],
  },  
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
