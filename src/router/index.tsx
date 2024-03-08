import { createBrowserRouter } from "react-router-dom";
import Magic from "../../migrate/pages/magic";
import LandingScreen from "../screens/landing";
import Page from "../../migrate/pages";
import Choose from "../screens/choose";
import Settings from "../screens/settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingScreen />,
  },
  {
    path: "/magic/:id",
    element: <Magic />,
  },
  {
    path: "/new",
    element: <Page />,
  },
  {
    path: "/choose",
    element: <Choose />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
]);
