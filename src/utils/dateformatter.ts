var months: { [key: number]: string } = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};
const formateDate = (time: any) => {
  const date = new Date(time);
  const day = date.getDate();
  return day;
};
const formateMonth = (time: any) => {
  const date = new Date(time);

  return months[date.getMonth()];
};
const formatDescription = (desc: any, number: any) => {
  if (desc != undefined) {
    if (desc.length > number) return desc.substring(0, number) + "....";
    else return desc;
  }
};

export { formatDescription, formateDate, formateMonth };
