import { day2TestInput, day2input } from "./day2input";

const inputs = day2input
  .split(",")
  .map((line) => line.split("-").map(Number));

console.log(inputs);

function checkValid(input: number): boolean {
  const inputStr = input.toString();
  if (inputStr.length % 2 !== 0) {
    return true;
  }
  const halfPoint = inputStr.length / 2;
  const firstHalf = inputStr.slice(0, halfPoint);
  const secondHalf = inputStr.slice(halfPoint);
  return firstHalf !== secondHalf;
}

const invalidList: number[] = [];

inputs.forEach(([start, end]) => {
  for (let i = start; i <= end; i++) {
    if (!checkValid(i)) {
      invalidList.push(i);
    }
  }
});
console.log(invalidList);
const sum = invalidList.reduce((acc, curr) => {
  return acc + curr;
}, 0);

console.log(sum);
