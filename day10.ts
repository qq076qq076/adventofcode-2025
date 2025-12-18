import { day10TestInput, day10Input } from "./day10input";

const inputList = day10Input
  .split("\n")
  .map((line) => ({
    lightDiagrams: line.match(/\[(.*?)\]/)?.[1] || "",
    wirings: Array.from(line.matchAll(/\((.*?)\)/g), (m) => m[1]),
    joltage: line.match(/\{(.*?)\}/)?.[1] || "",
  }))
  .map((item) => {
    const options = item.wirings.map((wiring) => {
      const str = wiring.split(",").map(Number);
      return toBinaryStr(str, item.lightDiagrams.length);
    });
    const result = item.lightDiagrams.replace(/\./g, "0").replace(/\#/g, "1");
    return {
      result: result.split("").join(""),
      options,
      wirings: item.wirings,
      joltage: item.joltage,
    };
  });

function toBinaryStr(numberList: number[], maxDigit: number): string {
  if (numberList.length === 0) return "";
  let result = [];
  for (let i = 0; i <= maxDigit - 1; i++) {
    result.push(numberList.includes(i) ? "1" : "0");
  }
  return result.join("");
}

console.log(inputList);

function press(currentSet: string, pressSet: string, length: number): string {
  const xor: number = parseInt(currentSet, 2) ^ parseInt(pressSet, 2);
  const result = xor.toString(2);
  return result.padStart(length, "0");
}

// 使用 BFS 找最少按壓次數和按壓組合
function findMinPresses(
  startState: string,
  targetState: string,
  options: string[]
): string[] | null {
  if (startState === targetState) return [];

  const queue: Array<{ state: string; sequence: string[] }> = [
    { state: startState, sequence: [] },
  ];
  const visited = new Set<string>([startState]);
  const length = startState.length;

  while (queue.length > 0) {
    const { state, sequence } = queue.shift()!;

    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      const newState = press(state, option, length);

      // 如果達到目標狀態，返回按壓次數和序列
      if (newState === targetState) {
        return [...sequence, option];
      }

      // 如果這個狀態還沒訪問過，加入陣列
      if (!visited.has(newState)) {
        visited.add(newState);
        queue.push({
          state: newState,
          sequence: [...sequence, option],
        });
      }
    }
  }
  return null;
}

let sum = 0;

for (let i = 0; i < inputList.length; i++) {
  const item = inputList[i];
  const startState = new Array(item.result.length).fill("0").join("");
  const result = findMinPresses(startState, item.result, item.options);
  console.log(result);
  sum += result?.length || 0;
  console.log();
}

console.log(`Total: ${sum}`);

// console.log(press("1101", "0010", "1111"));
// console.log(check("0000", "1111", ["1101", "0010"]));
