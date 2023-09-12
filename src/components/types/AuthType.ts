import { Dispatch, SetStateAction } from "react";
import { Year } from "./HomeTypes";
import { User, UserSignIn, UserSignUp } from "./UserTypes";

export type AuthContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  signed: boolean;
  signIn: ({ email, password }: UserSignIn) => Promise<void>;
  signUp: ({ name, email, password }: UserSignUp) => Promise<void>;
  logOut: () => Promise<void>;
  loadingLogin: boolean;
  incorrectPassword: boolean;
  statusMessage: string;
  setIncorrectPassword: Dispatch<SetStateAction<boolean>>;
  loadingUSer: boolean;
  storageUser: (data: User) => void;
  setDadosBanco: Dispatch<SetStateAction<Year[]>>;
  dadosBanco: Year[];
  setStatusMessage: Dispatch<SetStateAction<string>>;
};
