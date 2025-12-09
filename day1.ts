import { day1TestInput, day1Input } from "./day1input";

const inputList = day1Input
  .split("\n")
  .map((line) => line.trim())
  .map((text) => (text[0] === "L" ? +text.slice(1) * -1 : +text.slice(1)));
console.log(inputList);
let count = 0;
let sum = 50;

function offset(position: number, move: number) {
  let result = position + move;
  if (result < 0) {
    if (position !== 0) {
      count++;
    }
    result = offset(result, 100);
  } else if (result > 99) {
    if (result !== 100) {
      count++;
    }
    result = offset(result, -100);
  }
  return result;
}

inputList.forEach((curr) => {
  sum = offset(sum, curr);
  if(sum === 0){
    count++;
  }
  console.log("開始算sum", curr, sum);
  console.log("count", count);
});

console.log(count);
