import "./home.css";

import { Header } from "../../components/Header";
import { FormHors } from "./form";
import { useState } from "react";

export default function Home() {
  const [dadosBanco, setDadosBanco] = useState<any>([]);
  console.log(dadosBanco);
  return (
    <>
      <Header />
      <section className="home">
        <h1 className="title">Banco de Horas</h1>
        <FormHors setDadosBanco={setDadosBanco} dadosBanco={dadosBanco} />
      </section>
    </>
  );
}
