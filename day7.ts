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

function getTimes(row: string[], times: number[]) {
  const newTimes: number[] = Array(row.length).fill(0);
  times.forEach((time, index) => {
    if (row[index] === "^") {
      newTimes[index - 1] = (newTimes[index - 1] || 0) + time;
      newTimes[index + 1] = (newTimes[index + 1] || 0) + time;
    } else if (row[index] === ".") {
      newTimes[index] = newTimes[index] + time;
    }
  });
  return newTimes;
}

let tachyonList = new Set<number>([startIndex]);
let times: number[] = Array(inputList[0].length).fill(0);
times[startIndex] = 1;
for (let index = 1; index < inputList.length; index++) {
  if (inputList[index].findIndex((text) => text == "^") === -1) {
    continue;
  }
//   tachyonList = lightArea(inputList[index], tachyonList);
  times = getTimes(inputList[index], times);
}

// console.log(sum);

console.log(times.reduce((acc, curr) => acc + curr, 0));
