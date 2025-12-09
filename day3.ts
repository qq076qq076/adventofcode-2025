import { day3TestInput, day3input } from "./day3input";

const inputList = day3input.split("\n");

const joltages: number[] = [];

function getJoltage(input: string): number {
  for (let a = 9; a > -1; a--) {
    const firstIndex = input.indexOf(a.toString());
    if (firstIndex === -1) {
      continue;
    }
    for (let b = 9; b > -1; b--) {
      const lastIndex = input.indexOf(b.toString(), firstIndex + 1);
      if (lastIndex === -1) {
        continue;
      }
      return parseInt(`${a}${b}`);
    }
  }
  return 0;
}

inputList.forEach((input) => {
  const joltage = getJoltage(input);
  joltages.push(joltage);
});

console.log(joltages);

const total = joltages.reduce((acc, curr) => {
  return acc + curr;
}, 0);

console.log(total);
