import { Dispatch, SetStateAction } from "react";
import { ClassTypes } from "./ClassTypes";

export type PasswordTypes = {
  newPassword: string;
  currentPassword: string;
};

export type UpdateProps = {
  data: PasswordTypes;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setStatus: Dispatch<SetStateAction<ClassTypes>>;
  setRedirecting: Dispatch<SetStateAction<boolean>>;
  setStatusMessage: Dispatch<SetStateAction<string>>;
};
