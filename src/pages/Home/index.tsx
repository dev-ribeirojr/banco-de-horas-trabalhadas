import { useState } from "react";
import { FormHors } from "./form";

import "./home.css";

import { Table } from "./table";
import { Header } from "../../components/Header";
import { DadosBanco } from "../../components/types/HomeTypes";

export default function Home() {
  const [dadosBanco, setDadosBanco] = useState<DadosBanco[]>([]);

  return (
    <>
      <Header />
      <section className="home">
        <h1 className="title">Banco de Horas</h1>
        <FormHors setDadosBanco={setDadosBanco} dadosBanco={dadosBanco} />
        <Table dados={dadosBanco} />
      </section>
    </>
  );
}
