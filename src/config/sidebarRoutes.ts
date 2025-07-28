// src/config/sidebarRoutes.ts
import { lazy } from "react";
import { getImageSrc } from "../utils/imageUtils";
import type { SidebarRoute } from "../utils/types";

// Lazy load components
const Activities = lazy(() => import("../pages/activities/index"));
const Dashboard = lazy(() => import("../pages/dashboard/index"));

export const sidebarRoutes: Record<string, SidebarRoute[]> = {
  user: [
    {
      name: "Activities",
      path: "/activities",
      icon: getImageSrc("activity.svg"),
      component: Activities,
    },
    {
      name: "Hotels",
      path: "/hotels",
      icon: getImageSrc("hotels.svg"),
      component: Activities,
    },
    {
      name: "Flights",
      path: "/flights",
      icon: getImageSrc("flight.svg"),
      component: Activities,
    },
    {
      name: "Study",
      path: "/study",
      icon: getImageSrc("study.svg"),
      component: Activities,
    },
    {
      name: "Visa",
      path: "/visa",
      icon: getImageSrc("visa.svg"),
      component: Activities,
    },
    {
      name: "Immigration",
      path: "/immigration",
      icon: getImageSrc("immi.svg"),
      component: Activities,
    },
    {
      name: "Medical",
      path: "/medical",
      icon: getImageSrc("medical.svg"),
      component: Activities,
    },
    {
      name: "Vacation Packages",
      path: "/packages",
      icon: getImageSrc("package.svg"),
      component: Activities,
    },
  ],
};
