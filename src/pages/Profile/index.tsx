import { useContext, useState } from "react";
import "./profile.css";

import { Header } from "../../components/Header";

import avatar from "../../assets/avatar.png";

import { MdEdit } from "react-icons/md";
import { FormEditPassword } from "./form";
import { AuthContext } from "../../contexts/auth";

export default function Profile() {
  const [renderForm, setRenderForm] = useState<boolean>(false);
  const { user } = useContext(AuthContext);

  return (
    <>
      <Header />
      <section className="page-profile container">
        <section className="content-profile">
          <header className="header-profile">
            <div></div>
            <img
              src={avatar}
              alt="imagem perfil"
              width={120}
              height={120}
              className="img-profile"
            />
          </header>
          <section className="info-profile">
            <section className="info">
              <section className="name">
                <h1>{user?.name}</h1>
                <button className="button-edit name">
                  <MdEdit size={18} />
                </button>
              </section>
              <input placeholder={user?.email} disabled className="email" />
              <button
                className="button-edit-password"
                onClick={() => setRenderForm(!renderForm)}
              >
                {renderForm ? "CANCELAR" : "TROCAR SENHA"}
              </button>
            </section>
            {renderForm && <FormEditPassword />}
          </section>
        </section>
      </section>
    </>
  );
}
