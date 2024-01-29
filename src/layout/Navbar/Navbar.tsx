import "./Navbar.scss";
import logo from "../../assets/iqea_logo.png";
import UserImg from "../../assets/bx-user-circle.svg";
// import LogOutBtn from "@/components/LogOutBtn/LogOutBtn";

export default function Navbar() {

  return (
    <header>
      <nav>
        <div className="logo">
        <a href={'/'}>
          <img src={logo} alt="logo" />
        </a>
        </div>
        <div className="links">
          <ul>
          {/* <a href={!isDev?'/':'https://iqea-page.vercel.app/'}>
            <li>IQEA</li>
            </a> */}
            {/* <li><LogOutBtn/></li> */}
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
