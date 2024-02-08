/* eslint-disable @typescript-eslint/no-unused-vars */
// import AsideMenu from "./AsideMenu/AsideMenu";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
// import Footer from "./Footer/Footer";
// import "./MainLayout.scss";
import { ReactNode, useEffect, useState } from "react";
import { RoutesDirectory } from "../routes/RoutesDirectory";
import { useUserStore } from "../store/userStore";
import { setUpdateToken, verifyToken } from "../services/fetchData";


type Props = {
  children: ReactNode;
};




export default function MainLayout({ children }: Props) {
  const [loading, setLoading]=useState(true)
  const {jwtTokens, setSignout, setTokens} = useUserStore()
  const location = useLocation();
  // console.log('location' , location.pathname.slice(0,8))
  useEffect(()=>{

    const leVerify = async()=>{

      const res = await verifyToken(jwtTokens?.access as string)
      // console.log('verify',res)
      if(res.code==='token_not_valid'){
        // console.log('no valido :D ')
        setSignout()

      }

    }
    leVerify()
  })

  useEffect(()=>{
    const timeMunitesToMiliSecounds = (minutes:number)=>{
      return 1000 * 60 * minutes
    }
    const leUpdateToken=setInterval(async()=>{
      if(jwtTokens){
        const updateToken = await setUpdateToken(jwtTokens.refresh)
        // console.log(updateToken)

        if(updateToken.status===200){
          const newTokens = {
            access:updateToken.access,
            refresh:jwtTokens.refresh
          }
          setTokens(newTokens)
          setLoading(false)
        }else{
          setSignout()
        }



      }
    }, timeMunitesToMiliSecounds(50))
    return ()=>clearInterval(leUpdateToken)


  },[jwtTokens, loading])

  if (
    location.pathname === RoutesDirectory.LOG_IN
    || location.pathname === RoutesDirectory.SIGN_IN
    // location.pathname.slice(0, 7) === RoutesDirectory.VERIFY_USER.slice(0, 7)
  ) {
    return (
      <>
        {children}
      </>
    );
  } else {
    return (
      <>
          <Navbar />
          {children}
      </>
    );
  }
}
