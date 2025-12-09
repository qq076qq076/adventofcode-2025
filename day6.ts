import { day6TestInput, day6Input } from "./day6input";

const inputList = day6Input.split("\n");

// console.log(inputList);

function caculate(
  symbolType: "+" | "-" | "*" | "/",
  numberA: number,
  numberB: number
): number {
  if (symbolType === "+") {
    return numberA + numberB;
  } else if (symbolType === "-") {
    return numberA - numberB;
  } else if (symbolType === "*") {
    return numberA * numberB;
  } else if (symbolType === "/") {
    return numberA / numberB;
  }
  return 0;
}

let sum = 0;
for (
  let questionIndex = 0;
  questionIndex < inputList[0].length;
  questionIndex++
) {
  let result = +inputList[0][questionIndex];
  for (let index = 1; index < inputList.length - 1; index++) {
    const symbol = inputList[inputList.length - 1][questionIndex];
    const number = +inputList[index][questionIndex];
    result = caculate(symbol as "+" | "-" | "*" | "/", result, number);
  }
  sum = sum + result;
}

// console.log(sum);

const rotateInput: string[][] = [];
let questionIndex = 0;

const maxLength = inputList.reduce(
  (max, curr) => Math.max(max, curr.length),
  0
);

for (let yIndex = 0; yIndex < maxLength; yIndex++) {
  if (!rotateInput[questionIndex]) {
    rotateInput[questionIndex] = [inputList[inputList.length - 1][yIndex]];
  }
  let row = "";
  for (let xIndex = 0; xIndex < inputList.length - 1; xIndex++) {
    const text = inputList[xIndex][yIndex];
    row = row + text;
  }
  if (!row.trim()) {
    questionIndex++;
  } else {
    rotateInput[questionIndex].push(row.trim());
  }
}

let sum2 = 0;
rotateInput.forEach((question) => {
  let result = +question[1];
  for (let index = 2; index < question.length; index++) {
    const symbol = question[0] as "+" | "-" | "*" | "/";
    const number = +question[index];
    result = caculate(symbol, result, number);
  }
  sum2 = sum2 + result;
});

console.log(sum2);
