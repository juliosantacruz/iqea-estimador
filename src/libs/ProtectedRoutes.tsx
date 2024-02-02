import { Navigate, Outlet } from "react-router-dom"
import { RoutesDirectory } from "../routes/RoutesDirectory"
import { useUserStore } from "../store/userStore"


interface Props{
    isAllowed?:boolean
    children?:React.ReactNode
}

export const ProtectedRoute = ({isAllowed, children}:Props)=>{
  console.log(isAllowed)
  const {isAuth} = useUserStore()
    if(!isAuth)return <Navigate to={RoutesDirectory.LOG_IN}/>

    if(children){
        return <>{children}</>
    }else{
        return <Outlet/>
    }

}
