import { Timestamp } from "firebase/firestore";
import { Year } from "./HomeTypes";

type UserName = {
  name: string;
};
export type Email = {
  email: string;
};
export type UserSignIn = Email & {
  password: string;
};
export type UserSignUp = UserName & UserSignIn;

export type User = {
  uid: string;
  name: string;
  email: string;
  createdAcount: Timestamp | Date;
  banco: Year[] | null;
  save: boolean;
};
