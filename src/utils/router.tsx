import { createBrowserRouter } from "react-router-dom";
import CurrencyConverterPage from "../pages/CurrencyConverterPage/CurrencyConverterPage";
import CurrencyListPage from "../pages/CurrencyListPage/CurrencyListPage";
import App from "../App";
import React from "react";

export const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      {
        path: "/",
        element: <CurrencyConverterPage />,
      },
      {
        path: "currencies",
        element: <CurrencyListPage />,
      },
    ],
  },
]);
