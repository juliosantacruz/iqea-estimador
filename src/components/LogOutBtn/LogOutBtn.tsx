/* eslint-disable @typescript-eslint/no-unused-vars */
import {  useNavigate } from "react-router-dom";

import { useUserStore } from '../../store/userStore'
import './LogOutBtn.scss'
import { RoutesDirectory } from "../../routes/RoutesDirectory";


export default function LogOutBtn() {
  const navigate = useNavigate()
  const {setSignout}=useUserStore()


  const handleClick=()=>{

    setSignout()
    navigate(RoutesDirectory.HOME);

  }
  return (
    <button className='logout' onClick={handleClick}>Cerrar Sesion</button>
  )
}
