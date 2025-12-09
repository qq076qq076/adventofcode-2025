import { day3TestInput, day3input } from "./day3input";

const inputList = day3input.split("\n");

const joltages: string[] = [];

function getJoltage(input: string, digits: number, fromIndex = 0): string {
  for (let a = 9; a > -1; a--) {
    const index = input.indexOf(a.toString(), fromIndex);
    if (index !== -1) {
      if (digits === 1) {
        return a.toString();
      } else {
        const nextDigits = getJoltage(input, digits - 1, index + 1);
        if (nextDigits !== "") {
          return a.toString() + nextDigits;
        }
      }
    }
  }
  return "";
}

inputList.forEach((input) => {
  const joltage = getJoltage(input, 12);
  joltages.push(joltage);
});

console.log(joltages);

const total = joltages.reduce((acc: number, curr: string) => {
  return acc + parseInt(curr);
}, 0);

console.log(total);
