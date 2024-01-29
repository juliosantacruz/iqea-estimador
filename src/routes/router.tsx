// import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import Inicio from "../pages/Inicio";
import LogIn from "../pages/LogIn";
import NotFound from "../pages/NotFound";
import ErrorPage from "../pages/ErrorPage";
import Details from "../pages/Details"

export const RoutesDirectory = {
  LOG_IN: "/login",
  SIGN_IN: "/registro",
  HOME: "/",
  DETAILS: '/detalle/:projectId',
  GO_DETAILS: (projectId:string)=>`/detalle/${projectId}`,
};

const AppRoutes = () => {
  const routes = useRoutes([
    { path: RoutesDirectory.HOME, element: <Inicio />, errorElement:<ErrorPage/> },
    { path: RoutesDirectory.LOG_IN, element: <LogIn /> },
    // { path: RoutesDirectory.LOG_IN, element: <LogIn /> },
    { path: RoutesDirectory.DETAILS, element: <Details/>},

    { path: "*", element: <NotFound/> },

  ]);

  return routes;
};

export default AppRoutes;
