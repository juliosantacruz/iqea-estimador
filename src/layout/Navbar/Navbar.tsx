import "./Navbar.scss";
import logo from "../../assets/iqea_logo.png";
import UserImg from "../../assets/bx-user-circle.svg";
import LogOutBtn from "../../components/LogOutBtn/LogOutBtn";
import { Link } from "react-router-dom";
import { RoutesDirectory } from "../../routes/RoutesDirectory";
// import LogOutBtn from "@/components/LogOutBtn/LogOutBtn";
import {useUserStore}from "../../store/userStore"

export default function Navbar() {
  const {user} = useUserStore()
  return (
    <header>
      <nav>
        <div className="logo">
          <a href={"/"}>
            <img src={logo} alt="logo" />
          </a>
        </div>
        <div className="links">
          <ul>
            {/* <a href={!isDev?'/':'https://iqea-page.vercel.app/'}>
            <li>IQEA</li>
            </a> */}
            {
              user?.isAdmin&&
             <li>
              <Link to={RoutesDirectory.DASHBOARD} >Dashboard</Link>
            </li>

            }
            <li>
              <Link to={RoutesDirectory.PERFIL} >Perfil</Link>
            </li>
            <li>
              <LogOutBtn />
            </li>
            <li>
              <div className="dev-logo">
                <img src={UserImg} alt="logoDev" />
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
