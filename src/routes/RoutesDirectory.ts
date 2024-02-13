export const RoutesDirectory = {
  LOG_IN: "/login",
  SIGN_IN: "/registro",
  DASHBOARD:"/dashboard",
  PERFIL:"/perfil",
  HOME: "/",
  DETAILS: '/detalle/:projectId',
  GO_DETAILS: (projectId:string)=>`/detalle/${projectId}`,
};
