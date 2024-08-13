export const RoutesDirectory = {
  LOG_IN: "/login",
  SIGN_IN: "/registro",
  DASHBOARD:"/dashboard",
  PERFIL:"/perfil",
  CONFIG:"/configuracion",
  CONFIG_SYSTEM:`/configuracion/:systemCategory/:systemId`,
  GO_CONFIG_SYSTEM:(systemCategory:string,systemId:number)=>`/configuracion/${systemCategory}/${systemId}`,
  HOME: "/",
  DETAILS: '/detalle/:projectId',
  GO_DETAILS: (projectId:string)=>`/detalle/${projectId}`,
};
