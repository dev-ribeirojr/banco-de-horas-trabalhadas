import { useEffect, useState } from "react";
import "./notFound.css";
import Logo from "../../assets/logo-banco.png";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const [time, setTime] = useState<number>(5);
  const navigate = useNavigate();

  useEffect(() => {
    let contador = 5;
    const interval = setInterval(() => {
      if (contador === 0) {
        navigate("/home");
        clearInterval(interval);
        return;
      }
      contador--;
      setTime(contador);
    }, 1000);

    return () => {};
  }, []);

  return (
    <div className="container">
      <section className="not-found">
        <img src={Logo} alt="imagen da logo" width={150} className="logo" />
        <h1>Ops! Página não encontrada!</h1>
        <h1>[error] 404!</h1>

        <p>Você será redirecionado em {time === 0 ? "agora" : time}</p>
      </section>

      <div className="bubble bubble-one"></div>
      <div className="bubble bubble-two"></div>
      <div className="bubble bubble-tree"></div>
      <div className="bubble bubble-four"></div>
    </div>
  );
}
