export type DateForm = {
  date: string;
  start: string;
  startInterval: string;
  endInterval: string;
  end: string;
};

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
