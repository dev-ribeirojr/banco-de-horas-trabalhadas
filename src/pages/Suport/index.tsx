import "./suport.css";

import Logo from "../../assets/logo-banco.png";
import { Header } from "../../components/Header";
import FormSuport from "./form";

export default function Suport() {
  return (
    <>
      <Header />
      <section className="container suport">
        <img src={Logo} alt="imagen da logo" width={120} className="logo" />
        <h1>Fale Conosco!</h1>
        <FormSuport />
      </section>
    </>
  );
}
