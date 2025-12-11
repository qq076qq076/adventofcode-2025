import { day9TestInput, day9Input } from "./day9input";

const inputList = day9Input
  .split("\n")
  .map((line) => line.split(",").map(Number))
  .sort((a, b) => a[0] - b[0] || a[1] - b[1]);

console.log(inputList);

let max = 0;
let maxPos = { xa: 0, ya: 0, xb: 0, yb: 0 };

for (let i = 0; i < inputList.length; i++) {
  for (let j = inputList.length - 1; j > i; j--) {
    const a = inputList[i];
    const b = inputList[j];
    const area = (b[0] - a[0] + 1) * (b[1] - a[1] + 1);
    if (area > max) {
      max = area;
      maxPos = { xa: a[0], ya: a[1], xb: b[0], yb: b[1] };
    }
  }
}

console.log(max);
console.log(maxPos);
