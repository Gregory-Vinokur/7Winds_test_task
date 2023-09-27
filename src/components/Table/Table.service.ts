import { IRow } from "../../interfaces/IRow";

export const findDeepestId = (row: IRow): number | undefined => {
  if (row.child && row.child.length > 0) {
    return row.child[0].id;
  } else {
    return row.id;
  }
}

export const calculateLevel = (row: IRow): number => {
  let level = 2;
  let currentRow = row;

  while (currentRow.child && currentRow.child.length > 0) {
    level++;
    currentRow = currentRow.child[0];
  }

  return level;
}