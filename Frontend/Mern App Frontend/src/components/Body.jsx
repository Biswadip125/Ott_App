import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import Register from "./Register";
import SearchMovie from "./SearchMovie";
import Header from "./Header";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import Watch from "./Watch";
import SearchContents from "./SearchContents";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/editprofile",
      element: <EditProfile />,
    },
    {
      path: `watch/:id`,
      element: <Watch />,
    },
    {
      path: "/search",
      element: <SearchContents />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
