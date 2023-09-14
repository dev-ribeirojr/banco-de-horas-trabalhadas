import { useContext, ReactNode } from "react";
import { AuthContext } from "../contexts/auth";
import { Navigate } from "react-router-dom";

export default function Private({ children }: { children: ReactNode }) {
  const { signed, loadingUSer } = useContext(AuthContext);

  if (loadingUSer) {
    return <section></section>;
  }

  if (!signed) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
