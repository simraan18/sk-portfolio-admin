import App from "@/App";
import Home from "@/page/home";
import PageNotFound from "@/page/not-found";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: App,
    children: [{ index: true, Component: Home }],
    errorElement: <PageNotFound />,
  },
]);
