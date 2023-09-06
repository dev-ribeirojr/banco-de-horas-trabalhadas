import { BrowserRouter } from "react-router-dom";
import "./app.css";
import RoutesApp from "./routes/routes";

import AuthProvider from "./contexts/auth";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  );
}
