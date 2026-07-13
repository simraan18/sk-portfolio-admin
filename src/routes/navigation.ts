import type { IAppNavigation } from "@/vite-env";
import { v4 as uuidv4 } from "uuid";
import { routePath } from "./route-path";
import {
  Boxes,
  BriefcaseBusiness,
  House,
  MessageCircle,
  UserRoundPen,
  WalletCards,
} from "lucide-react";

export const sidePanel: IAppNavigation[] = [
  {
    id: uuidv4(),
    path: routePath.home,
    label: "Home",
    icon: House,
  },
  {
    id: uuidv4(),
    path: routePath.profile,
    label: "Profile",
    icon: UserRoundPen,
  },
  {
    id: uuidv4(),
    path: routePath.experience,
    label: "Experience",
    icon: BriefcaseBusiness,
  },
  {
    id: uuidv4(),
    path: routePath.cardCategoy,
    label: "Card Category",
    icon: Boxes,
  },
  {
    id: uuidv4(),
    path: routePath.card,
    label: "Card",
    icon: WalletCards,
  },
  {
    id: uuidv4(),
    path: routePath.socialLinks,
    label: "Social Links",
    icon: MessageCircle,
  },
];
