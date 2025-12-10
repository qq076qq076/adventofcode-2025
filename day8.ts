import { day8input, day8TestInput } from "./day8input";

interface Coordinate {
  x: number;
  y: number;
  z: number;
}

function calulateDistance(
  coordinate1: Coordinate,
  coordinate2: Coordinate
): number {
  return Math.sqrt(
    Math.pow(coordinate1.x - coordinate2.x, 2) +
      Math.pow(coordinate1.y - coordinate2.y, 2) +
      Math.pow(coordinate1.z - coordinate2.z, 2)
  );
}

const inputs = day8input
  .split("\n")
  .map((line) => line.split(",").map(Number));

const lineCount = 1000;

const disList: {
  a: Coordinate;
  b: Coordinate;
  dis: number;
}[] = [];

inputs.forEach((coordinate, index) => {
  for (let i = index + 1; i < inputs.length; i++) {
    const a: Coordinate = {
      x: coordinate[0],
      y: coordinate[1],
      z: coordinate[2],
    };
    const b: Coordinate = {
      x: inputs[i][0],
      y: inputs[i][1],
      z: inputs[i][2],
    };
    const dis = calulateDistance(a, b);
    disList.push({ a, b, dis });
  }
});

disList.sort((a, b) => a.dis - b.dis);

// console.log(disList);

const connectedList: string[][] = inputs.map((item) => [
  `${item[0]},${item[1]},${item[2]}`,
]);

function findInConnectedList(coordinate: Coordinate) {
  const coordinateStr = `${coordinate.x},${coordinate.y},${coordinate.z}`;
  return connectedList.findIndex((items) => items.includes(coordinateStr));
}

for (
  let disIndex = 0, use = lineCount;
  use > 0 && disIndex < disList.length;
  disIndex++
) {
  const item = disList[disIndex];
  const lineAIndex: number = findInConnectedList(item.a) as number;
  const lineBIndex: number = findInConnectedList(item.b) as number;
  if (lineAIndex !== lineBIndex) {
    connectedList[lineAIndex].push(...connectedList[lineBIndex]);
    connectedList.splice(lineBIndex, 1);
  }
  use--;
}

const sum = connectedList
  .sort((a, b) => b.length - a.length)
  .slice(0, 3)
  .map((item) => item.length)
  .reduce((acc, curr) => acc * curr, 1);

console.log(sum);
