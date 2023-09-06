import { Link } from "react-router-dom";
import { FormRegister } from "./form";

export default function Register() {
  return (
    <div className="container">
      <section className="login">
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
