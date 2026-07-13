import App from "@/App";
import PageNotFound from "@/page/not-found";
import { createBrowserRouter } from "react-router";
import { routePath } from "./route-path";
import { lazy } from "react";

const HomePage = lazy(() => import("@/page/Home"));
const ProfilePage = lazy(() => import("@/page/Profile"));

export const router = createBrowserRouter([
  {
    Component: App,
    children: [
      { index: true, Component: HomePage },
      { path: routePath.profile, Component: ProfilePage },
    ],
    errorElement: <PageNotFound />,
  },
]);
