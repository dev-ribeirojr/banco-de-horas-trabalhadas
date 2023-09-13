import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import RecoverPassword from "../pages/RecoverPassword";
import Register from "../pages/Register";

import Private from "./Private";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import Suport from "../pages/Suport";

export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
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
      <Route
        path="/profile"
        element={
          <Private>
            <Profile />
          </Private>
        }
      />

      <Route
        path="/suport"
        element={
          <Private>
            <Suport />
          </Private>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
