import { day4input, day4TestInput } from "./day4input";

const rows = day4input.split("\n").map((row) => row.split(""));

// console.log(rows);

const colMax = 4;

function checkRow(row: string[], colIndex: number, isCurrent: boolean = false) {
  if (!row) {
    return 0;
  }

  const prev = row[colIndex - 1] === "@" ? 1 : 0;
  const current = !isCurrent && row[colIndex] === "@" ? 1 : 0;
  const next = row[colIndex + 1] === "@" ? 1 : 0;
  return prev + current + next;
}

function checkPoint(rows: string[][], rowIndex: number, colIndex: number) {
  const prevRow = checkRow(rows[rowIndex - 1], colIndex);
  const currentRow = checkRow(rows[rowIndex], colIndex, true);
  const nextRow = checkRow(rows[rowIndex + 1], colIndex);
  return prevRow + currentRow + nextRow;
}

function checkRemove(rows: string[][]) {
  const removeList: { rowIndex: number; colIndex: number }[] = [];
  rows.forEach((row, rowIndex) => {
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const sum = checkPoint(rows, rowIndex, colIndex);
      const isPaper = row[colIndex] === "@";
      if (sum < colMax && isPaper) {
        removeList.push({ rowIndex, colIndex });
      }
    }
  });
  return removeList;
}

function remove(
  rows: string[][],
  removeList: { rowIndex: number; colIndex: number }[]
) {
  return rows.map((row, rowIndex) => {
    return row.map((col, colIndex) => {
      if (
        removeList.some(
          (removeItem) =>
            rowIndex === removeItem.rowIndex && colIndex === removeItem.colIndex
        )
      ) {
        return ".";
      }
      return col;
    });
  });
}

function progress(rows: string[][]): number {
  const removeList = checkRemove(rows);
  const newRows = remove(rows, removeList);
  if (removeList.length > 0) {
    return removeList.length + progress(newRows);
  }
  return removeList.length;
}

console.log(progress(rows));
