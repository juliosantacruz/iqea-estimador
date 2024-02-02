export const RoutesDirectory = {
  LOG_IN: "/login",
  SIGN_IN: "/registro",
  HOME: "/",
  DETAILS: '/detalle/:projectId',
  GO_DETAILS: (projectId:string)=>`/detalle/${projectId}`,
};
