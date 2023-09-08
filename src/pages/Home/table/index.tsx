export function Table() {
  const table = [
    {
      id: "agosto2023",
      mes: "agosto",
      days: [
        {
          data: "08/09/2023",
          inicio: "08:00",
          inicioIntervalo: "11:00",
          fimIntervalo: "12:00",
          fim: "16:00",
        },
      ],
    },
  ];

  const data = new Date();

  console.log(data.getMonth());
}
