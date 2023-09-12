import { Dispatch, SetStateAction } from "react";
import { User } from "./Usertypes";

export type Day = {
  date: string;
  start: string;
  startInterval: string;
  endInterval: string;
  end: string;
  total: string;
};

export type Month = {
  id: string;
  month: string;
  days: Day[];
};

export type Year = {
  year: string;
  months: Month[];
};

export type DataForm = {
  date: string;
  start: string;
  startInterval: string;
  endInterval: string;
  end: string;
};

type PropsFunction = {
  user: User | null;
  dadosBanco: Year[];
  setUser: Dispatch<SetStateAction<User | null>>;
  setSave: Dispatch<SetStateAction<boolean>>;
  storageUser: (data: User) => void;
};
type UpdateDadosBanco = {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSucess: Dispatch<SetStateAction<boolean>>;
};
type AddProp = {
  data: DataForm;
  setDadosBanco: Dispatch<SetStateAction<Year[]>>;
  setExistDate: Dispatch<SetStateAction<boolean>>;
};

export type FormHoursProp = {
  setSave: Dispatch<SetStateAction<boolean>>;
};

export type HandleAddProp = PropsFunction & AddProp;
export type HandleUpdateDadosBancoProps = PropsFunction & UpdateDadosBanco;
