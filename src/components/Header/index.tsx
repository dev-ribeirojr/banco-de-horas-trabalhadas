import { Link } from "react-router-dom";
import "./header.css";

import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

import { BiSolidLogOut, BiSolidUserRectangle, BiSupport } from "react-icons/bi";
import { FaHome } from "react-icons/fa";

export function Header() {
  const { logOut } = useContext(AuthContext);

  return (
    <header className="header">
      <nav>
        <Link to={"/profile"}>
          <p className="text-header">perfil</p>
          <BiSolidUserRectangle size={25} />
        </Link>
        <Link to={"/home"}>
          <p className="text-header">início</p>
          <FaHome size={25} />
        </Link>
        <Link to={"/suport"}>
          <p className="text-header">suporte</p>
          <BiSupport size={25} />
        </Link>
        <button onClick={logOut}>
          <p className="text-header">sair</p>
          <BiSolidLogOut size={25} />
        </button>
      </nav>
    </header>
  );
}
