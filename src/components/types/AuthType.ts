import { Timestamp } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";

export type DataUserProps = {
  name: string;
  email: string;
  uid: string;
  createdAcount: Timestamp | Date;
};

export type UserSignInProps = {
  password: string;
  email: string;
};

export type UserCreatedProps = {
  name: string;
};
export type UserSignUpProps = UserCreatedProps & UserSignInProps;

export type AuthContextType = {
  user: object | null | undefined;
  signed: boolean;
  signIn: ({ email, password }: UserSignInProps) => Promise<void>;
  signUp: ({ name, email, password }: UserSignUpProps) => Promise<void>;
  logOut: () => Promise<void>;
  loadingLogin: boolean;
  incorrectPassword: boolean;
  statusMessage: string;
  setIncorrectPassword: Dispatch<SetStateAction<boolean>>;
  loadingUSer: boolean;
};