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

const CardListPage = lazy(() => import("@/page/Card/CardListPage"));
const CardCreatePage = lazy(() => import("@/page/Card/CardCreatePage"));
const CardUpdatePage = lazy(() => import("@/page/Card/CardUpdatePage"));

const SocialLinkListPage = lazy(
  () => import("@/page/SocialLink/SocialLinkListPage"),
);
const SocialLinkCreatePage = lazy(
  () => import("@/page/SocialLink/SocialLinkCreatePage"),
);
const SocialLinkUpdatePage = lazy(
  () => import("@/page/SocialLink/SocialLinkUpdatePage"),
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
      { path: routePath.card, Component: CardListPage },
      { path: routePath.cardCreate, Component: CardCreatePage },
      { path: routePath.cardUpdate, Component: CardUpdatePage },
      { path: routePath.socialLinks, Component: SocialLinkListPage },
      { path: routePath.socialLinkCreate, Component: SocialLinkCreatePage },
      { path: routePath.socialLinkUpdate, Component: SocialLinkUpdatePage },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    Component: PageNotFound,
  },
]);
