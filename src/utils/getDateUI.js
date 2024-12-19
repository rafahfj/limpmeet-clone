export const getDateUI = (tanggal) => {
  var currentdate = new Date(tanggal);
  const day = currentdate.getDay();
  const dayNames = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  var datetime =
    dayNames[day] +
    " " +
    currentdate.getDate() +
    " " +
    month[currentdate.getMonth()] +
    " " +
    currentdate.getFullYear() +
    " " +
    currentdate.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "numeric",
      minute: "numeric",
    });

  return datetime;
};
