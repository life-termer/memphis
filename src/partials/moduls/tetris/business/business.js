import { defaultCell } from "./cell";

export const buildBoard = ({ rows, columns }) => {
  const buildRows = Array.from({ length: rows }, () => ({ ...defaultCell }));

  return {
    rows: buildRows,
    size: { rows, columns },
  };
};
