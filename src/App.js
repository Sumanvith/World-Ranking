import ReactDOM from "react-dom/client";
import React from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import CountryPage from "./components/CountryPage";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="bg-[#1B1D1F]">
      <Header></Header>
      <Outlet></Outlet>
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout></AppLayout>,
    children: [
      {
        path: "/",
        element: <Body></Body>,
      },
      {
        path: "/country/:countryCode",
        element: <CountryPage></CountryPage>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
