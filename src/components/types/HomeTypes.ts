import { Dispatch, SetStateAction } from "react";

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

export type DadosBanco = {
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

export type HandleAddProp = {
  data: DataForm;
  dadosBanco: DadosBanco[];
  setDadosBanco: Dispatch<SetStateAction<DadosBanco[]>>;
  setExistDate: Dispatch<SetStateAction<boolean>>;
};
