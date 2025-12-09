import { day2TestInput, day2input } from "./day2input";

const inputs = day2input
  .split(",")
  .map((line) => line.split("-").map(Number));

function checkValid(input: number): boolean {
  const inputStr = input.toString();
  const maxPoint = Math.ceil(inputStr.length / 2);
  for (let strLength = maxPoint; strLength > 0; strLength--) {
    if (inputStr.length % strLength !== 0) {
      continue;
    }
    const repeatCount = inputStr.length / strLength;
    if (repeatCount === 1) {
      continue;
    }
    const matchStr = inputStr.slice(0, strLength).repeat(repeatCount);
    if (matchStr === inputStr) {
      return false;
    }
  }
  return true;
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
