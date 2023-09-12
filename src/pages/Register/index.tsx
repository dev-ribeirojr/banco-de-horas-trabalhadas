import { Link, useNavigate } from "react-router-dom";
import { FormRegister } from "./form";
import Logo from "../../assets/logo-banco.png";
import { AuthContext } from "../../contexts/auth";
import { useContext, useEffect } from "react";

export default function Register() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
    return () => {};
  }, [user]);
  return (
    <div className="container">
      <section className="login">
        <img src={Logo} alt="imagen da logo" width={120} className="logo" />
        <h1 className="login-title">Criar Conta</h1>
        <FormRegister />
        <p className="login-or-register">
          Tenho uma conta, <Link to={"/"}>Fazer login!</Link>
        </p>
      </section>

      <div className="bubble bubble-one"></div>
      <div className="bubble bubble-two"></div>
      <div className="bubble bubble-tree"></div>
      <div className="bubble bubble-four"></div>
    </div>
  );
}
