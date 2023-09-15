import { Dispatch, SetStateAction } from "react";

export type SendMessage = {
  text: string;
};
export type SendText = {
  text: string;
  email: string;
  name: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setMessageStatus: Dispatch<SetStateAction<string>>;
  reset: any;
};
