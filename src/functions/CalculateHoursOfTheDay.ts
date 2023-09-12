export function calculateHoursOfTheDay(
  primaryValue: string,
  secundaryValue: string
) {
  let primaryValueHours = Number(primaryValue.slice(0, 2));
  let primaryValueMin = Number(primaryValue.slice(3, 5));

  let secundaryValueHours = Number(secundaryValue.slice(0, 2));
  let secundaryValueMin = Number(secundaryValue.slice(3, 5));

  if (primaryValueMin > secundaryValueMin) {
    // Removendo 1 hora e adicionando 60 min
    secundaryValueHours = secundaryValueHours - 1;
    secundaryValueMin = secundaryValueMin + 60;
  }

  let hours = secundaryValueHours - primaryValueHours;
  let min = secundaryValueMin - primaryValueMin;

  let resHours = hours < 10 ? `0${hours}` : `${hours}`;
  let resMin = min < 10 ? `0${min}` : `${min}`;

  return `${resHours}:${resMin}`;
}
