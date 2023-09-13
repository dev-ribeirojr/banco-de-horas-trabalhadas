import { Dispatch, SetStateAction } from "react";
import { User } from "./UserTypes";

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
export type DataFormEdit = {
  dateEdit: string;
  startEdit: string;
  startIntervalEdit: string;
  endIntervalEdit: string;
  endEdit: string;
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

/* ------- Type utilizados no component Table ---------- */

export type Save = {
  setSave: Dispatch<SetStateAction<boolean>>;
};

export type DataDay = {
  data: {
    day: Day;
    month: string;
    year: string;
  };
  setDataDay: Dispatch<SetStateAction<any>>;
  setSave: Dispatch<SetStateAction<boolean>>;
};

export type HandleDeleDayProps = {
  day: Day;
  month: string;
  year: string;
  setDataDay: Dispatch<SetStateAction<DataDay | null>>;
  dadosBanco: Year[];
  setDadosBanco: Dispatch<SetStateAction<Year[]>>;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  storageUser: (data: User) => void;
  setSave: Dispatch<SetStateAction<boolean>>;
};

export type HandleEditDayProps = HandleDeleDayProps & {
  data: DataFormEdit;
};
