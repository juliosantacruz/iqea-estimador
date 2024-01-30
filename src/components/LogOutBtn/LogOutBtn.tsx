/* eslint-disable @typescript-eslint/no-unused-vars */

import { useUserStore } from '../../store/userStore'
import './LogOutBtn.scss'


export default function LogOutBtn() {

  const {setIsAuth, setSignout,isAuth}=useUserStore()
  // console.log('not auth',isAuth)

  // useEffect(()=>{
  //   if(!isAuth){
  //     console.log('not auth',isAuth)
  //     // router.replace('/login')
  //   }
  // },[isAuth])

  const handleClick=()=>{
    setIsAuth(false)
    setSignout()
  }
  return (
    <button className='logout' onClick={handleClick}>Cerrar Sesion</button>
  )
}
