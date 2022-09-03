import { lz } from "./leadingZeros";

export const dateToInput = (date) => {
  const dt = new Date(date);

  if (dt.toString() === "Invalid Date") {
    return dt.toString();
  }

  const y = lz(date.getFullYear(), 4);
  const m = lz(date.getMonth() + 1);
  const d = lz(date.getDate());
  return `${y}-${m}-${d}`;
};

export const inputToDate = (input) => {
  const [y, m, d] = input.split("-");
  return new Date(+y, +m - 1, +d);
};
