import { useContext, useEffect } from "react";
import "./loginAndRegister.css";

import Logo from "../../assets/logo-banco.png";

import { FormLogin } from "./form/index.jsx";
import { AuthContext } from "../../contexts/auth.js";
import { Link } from "react-router-dom";

export default function LoginAndRegister() {
  const { incorrectPassword, setIncorrectPassword } = useContext(AuthContext);

  useEffect(() => {
    function forgotPassword() {
      setIncorrectPassword(false);
    }
    forgotPassword();
  }, []);

  return (
    <div className="container">
      <section className="login">
        <img src={Logo} alt="imagen da logo" width={120} className="logo" />
        <h1 className="login-title">Fazer Login</h1>
        <FormLogin />
        {incorrectPassword && (
          <Link to={"/recover-password"} className="recover-link">
            Esqueceu a senha?
          </Link>
        )}
        <p className="login-or-register">
          Sou novo por aqui, <Link to={"/register"}>Criar uma conta!</Link>
        </p>
      </section>

      <div className="bubble bubble-one"></div>
      <div className="bubble bubble-two"></div>
      <div className="bubble bubble-tree"></div>
      <div className="bubble bubble-four"></div>
    </div>
  );
}
