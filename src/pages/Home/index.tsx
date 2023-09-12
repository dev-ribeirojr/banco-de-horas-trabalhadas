import { useContext, useState, useEffect } from "react";
import { FormHors } from "./form";
import "./home.css";
import { Table } from "./table";
import { Header } from "../../components/Header";
import { handleUpdateDadosBanco } from "../../functions/HandleUpdateDadosBaco";
import { AuthContext } from "../../contexts/auth";
import { LoadingCircle } from "../../components/loading";
import StatusText from "../../components/StatusMessage";

export default function Home() {
  const [save, setSave] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [sucess, setSucess] = useState<boolean>(false);

  const { dadosBanco, user, storageUser, setUser } = useContext(AuthContext);
  const propsFunction = {
    dadosBanco,
    setSave,
    setLoading,
    user,
    setUser,
    storageUser,
    setSucess,
  };

  useEffect(() => {
    function saveOn() {
      setSave(user?.save!);
    }
    if (user) {
      saveOn();
    }
  }, []);

  return (
    <>
      <Header />
      <section className="home">
        <h1 className="title">Banco de Horas</h1>
        <FormHors setSave={setSave} />

        {save && (
          <button
            type="button"
            onClick={() => handleUpdateDadosBanco(propsFunction)}
            disabled={loading}
            className="save-button"
          >
            {loading ? <LoadingCircle /> : "SALVAR"}
          </button>
        )}
        {sucess && (
          <div>
            <StatusText
              status="info-sucess"
              statusMessage="Salvo com sucesso!"
            />
          </div>
        )}
        <Table />
      </section>
    </>
  );
}
