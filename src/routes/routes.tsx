import { Routes, Route } from "react-router-dom";

import LoginAndRegister from "../pages/LoginAndRegister";
import RecoverPassword from "../pages/RecoverPassword";
import Register from "../pages/Register";

import Private from "./Private";
import Home from "../pages/Home";

export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<LoginAndRegister />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recover-password" element={<RecoverPassword />} />
      <Route
        path="/home"
        element={
          <Private>
            <Home />
          </Private>
        }
      />

      {/* criar página de not found */}
    </Routes>
  );
}
