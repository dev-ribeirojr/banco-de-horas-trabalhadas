import { Dispatch, SetStateAction } from "react";
import { ClassMessage } from "./ClassTypes";

export type Password = {
  newPassword: string;
  currentPassword: string;
};

export type PasswordUpdateProfile = Password & {
  confirmNewPassword: string;
};

export type UpdateProfile = {
  data: Password;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setStatus: Dispatch<SetStateAction<ClassMessage>>;
  setRedirecting: Dispatch<SetStateAction<boolean>>;
  setStatusMessage: Dispatch<SetStateAction<string>>;
  logOut: () => Promise<void>;
};
