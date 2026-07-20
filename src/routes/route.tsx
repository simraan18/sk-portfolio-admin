import App from "@/App";
import PageNotFound from "@/page/not-found";
import { createBrowserRouter } from "react-router";
import { routePath } from "./route-path";
import { lazy } from "react";
import ErrorPage from "@/components/ErrorPage";

const HomePage = lazy(() => import("@/page/Home"));

const ProfileListPage = lazy(() => import("@/page/Profile/ProfileList"));
const ProfileUpdatePage = lazy(() => import("@/page/Profile/ProfileUpdate"));
const ProfileCreatePage = lazy(() => import("@/page/Profile/ProfileCreate"));

const LoginPage = lazy(() => import("@/page/LoginPage"));

const ExperienceListPage = lazy(
  () => import("@/page/Experience/ExperienceListPage"),
);
const ExperienceUpdatePage = lazy(
  () => import("@/page/Experience/ExperienceUpdatePage"),
);
const ExperienceCreatePage = lazy(
  () => import("@/page/Experience/ExperienceCreatePage"),
);

const CardCategoryPage = lazy(
  () => import("@/page/CardCategory/CardCategoryPage"),
);
const CardCategoryUpdatePage = lazy(
  () => import("@/page/CardCategory/CardCategoryUpdatePage"),
);
const CardCategoryCreatePage = lazy(
  () => import("@/page/CardCategory/CardCategoryCreatePage"),
);

export const router = createBrowserRouter([
  {
    Component: LoginPage,
    path: routePath.login,
  },
  {
    Component: App,
    children: [
      { index: true, Component: HomePage },
      { path: routePath.profile, Component: ProfileListPage },
      { path: routePath.updateProfile, Component: ProfileUpdatePage },
      { path: routePath.profileCreate, Component: ProfileCreatePage },
      { path: routePath.experience, Component: ExperienceListPage },
      { path: routePath.experienceCreate, Component: ExperienceCreatePage },
      { path: routePath.experienceUpdate, Component: ExperienceUpdatePage },
      { path: routePath.cardCategoy, Component: CardCategoryPage },
      { path: routePath.cardCategoryCreate, Component: CardCategoryCreatePage },
      { path: routePath.cardCategoryUpdate, Component: CardCategoryUpdatePage },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    Component: PageNotFound,
  },
]);
