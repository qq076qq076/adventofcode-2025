import { day5TestInput, day5Input } from "./day5input";

const rangeList = day5Input
  .split("\n\n")[0]
  .split("\n")
  .map((line) => line.split("-").map(Number));
const idList = day5Input.split("\n\n")[1].split("\n").map(Number);

function checkFresh(input: number, start: number, end: number) {
  return input >= start && input <= end;
}

const freshIdList = idList.filter((id) => {
  return rangeList.some(([start, end]) => {
    return checkFresh(id, start, end);
  });
});

// console.log(freshIdList.length);

rangeList.sort((a, b) => a[0] - b[0]);

const mergedRangeList: [number, number][] = [];

function addToRange(rangeList: [number, number][], start: number, end: number) {
  const prevEnd = rangeList[rangeList.length - 1]?.[1] || 0;
  if (start > prevEnd) {
    rangeList.push([start, end]);
  } else if (end > prevEnd) {
    rangeList[rangeList.length - 1][1] = end;
  }
  return rangeList;
}

for (let index = 0; index < rangeList.length; index++) {
  const [start, end] = rangeList[index];
  addToRange(mergedRangeList, start, end);
}

const sum = mergedRangeList.reduce((acc, [start, end]) => {
  return acc + (end - start + 1);
}, 0);

console.log(mergedRangeList);
console.log(sum);
