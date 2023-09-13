import { Dispatch, SetStateAction } from "react";
import { Email } from "./UserTypes";

export type RecoverPassword = {
  data: Email;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setRecoverStatus: Dispatch<SetStateAction<boolean>>;
  setClassStatus: Dispatch<SetStateAction<string>>;
  setMessageStatus: Dispatch<SetStateAction<string>>;
};
