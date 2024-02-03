import "./Register.scss";
import bgImage from "../../assets/contactoImg.jpg";
import logoImage from "../../assets/iqea_logo.png";
import RegisterForm from "../../Forms/RegisterForm/RegisterForm";

export default function Register() {
  return (
    <section>
      <section className="signInPage">
        <div className="signInImg">
          <img src={bgImage} alt="background image" />
        </div>

        <div className="signInData">
          <div className="LogInHeader">
            <div className="formTitle">
              <h2>Iniciar Sesion</h2>
            </div>{" "}
            <img src={logoImage} alt="logo" width={300} />
          </div>

          <>
            <RegisterForm />
          </>
        </div>
      </section>
    </section>
  );
}
