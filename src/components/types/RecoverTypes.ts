import { Dispatch, SetStateAction } from "react";

export type FormProps = {
  email: string;
};
export type RecoverPasswordProps = {
  data: FormProps;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setRecoverStatus: Dispatch<SetStateAction<boolean>>;
  setClassStatus: Dispatch<SetStateAction<string>>;
  setMessageStatus: Dispatch<SetStateAction<string>>;
};
