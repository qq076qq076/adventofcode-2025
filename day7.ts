import { day7Input, day7TestInput } from "./day7input";

const inputList = day7Input.split("\n").map((line) => line.split(""));

// console.log(inputList);

const startIndex = inputList[0].findIndex((text) => text == "S");

let sum = 0;
function lightArea(row: string[], tachyonList: Set<number>) {
  const newTachyonList = new Set<number>();
  tachyonList.forEach((index) => {
    if (row[index] === "^") {
      sum++;
      newTachyonList.add(index - 1);
      newTachyonList.add(index + 1);
    } else if (row[index] === ".") {
      newTachyonList.add(index);
    }
  });
  return newTachyonList;
}

let tachyonList = new Set<number>([startIndex]);
for (let index = 1; index < inputList.length; index++) {
  tachyonList = lightArea(inputList[index], tachyonList);
}

console.log(sum);
