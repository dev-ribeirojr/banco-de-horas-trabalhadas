import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { Navigate } from "react-router-dom";
import { PrivateProps } from "../components/types/PrivatesTypes";

export default function Private({ children }: PrivateProps) {
  const { signed, loadingUSer } = useContext(AuthContext);

  if (loadingUSer) {
    return <section></section>;
  }

  if (!signed) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
