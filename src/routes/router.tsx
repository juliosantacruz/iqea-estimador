// import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import Inicio from "../pages/Inicio";
import LogIn from "../pages/LogIn";
import NotFound from "../pages/NotFound";
import ErrorPage from "../pages/ErrorPage";
import Details from "../pages/Details"
import { RoutesDirectory } from "./RoutesDirectory";
import { ProtectedRoute } from "../libs/ProtectedRoutes";
import Register from "../pages/Register";


const AppRoutes = () => {
  const routes = useRoutes([
    { path: RoutesDirectory.LOG_IN, element: <LogIn /> },
    { path: RoutesDirectory.SIGN_IN, element: <Register /> },

    { element: <ProtectedRoute isAllowed={false} />, children:[
      { path: RoutesDirectory.HOME, element: <Inicio />, errorElement:<ErrorPage/> },
      { path: RoutesDirectory.DETAILS, element: <Details/>},


    ]},

    { path: "/*", element: <NotFound/> },

  ]);

  return routes;
};

export default AppRoutes;
