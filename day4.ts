import { day4input, day4TestInput } from "./day4input";

const rows = day4input.split("\n");

// console.log(rows);

const colMax = 4;

function checkRow(row: string, colIndex: number, isCurrent: boolean = false) {
  if (!row) {
    return 0;
  }

  const prev = row[colIndex - 1] === "@" ? 1 : 0;
  const current = !isCurrent && row[colIndex] === "@" ? 1 : 0;
  const next = row[colIndex + 1] === "@" ? 1 : 0;
  return prev + current + next;
}

function checkPoint(rowIndex: number, colIndex: number) {
  const prevRow = checkRow(rows[rowIndex - 1], colIndex);
  const currentRow = checkRow(rows[rowIndex], colIndex, true);
  const nextRow = checkRow(rows[rowIndex + 1], colIndex);
  return prevRow + currentRow + nextRow;
}

let total = 0;
rows.forEach((row, rowIndex) => {
  for (let colIndex = 0; colIndex < row.length; colIndex++) {
    const sum = checkPoint(rowIndex, colIndex);
    const isPaper = row[colIndex] === "@";
    if (sum < colMax && isPaper) {
      total++;
    }
  }
});
console.log(total);
