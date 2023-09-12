import { Dispatch, SetStateAction, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

export function handleRedirect(
  setRedirecting: Dispatch<SetStateAction<boolean>>
) {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);

  setTimeout(() => {
    navigate("/");
    logOut();
    setRedirecting(false);
  }, 5000);
}
