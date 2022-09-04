import { lz } from "./leadingZeros";

export const dateToInput = (date) => {
  const dt = new Date(date);

  if (dt.toString() === "Invalid Date") {
    return undefined;
  }

  const y = lz(dt.getFullYear(), 4);
  const m = lz(dt.getMonth() + 1);
  const d = lz(dt.getDate());
  return `${y}-${m}-${d}`;
};

export const inputToDate = (input) => {
  const [y, m, d] = input.split("-");
  return new Date(+y, +m - 1, +d);
};
