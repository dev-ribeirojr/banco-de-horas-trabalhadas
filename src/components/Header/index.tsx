import { Link } from "react-router-dom";
import "./header.css";

import { BiSolidLogOut, BiSolidUserRectangle } from "react-icons/bi";
import { FaHome } from "react-icons/fa";

export function Header() {
  return (
    <header className="header">
      <nav>
        <Link to={"/profile"}>
          <p className="text-header">perfil</p>
          <BiSolidUserRectangle size={25} />
        </Link>
        <Link to={"/home"}>
          <p className="text-header">Início</p>
          <FaHome size={25} />
        </Link>
        <button>
          <p className="text-header">sair</p>
          <BiSolidLogOut size={25} />
        </button>
      </nav>
    </header>
  );
}
