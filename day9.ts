import { day9TestInput, day9Input } from "./day9input";

const inputList = day9TestInput
  .split("\n")
  .map((line) => line.split(",").map(Number))
  .sort((a, b) => a[0] - b[0] || a[1] - b[1]);

console.log(inputList);

interface Coordinate {
  x: number;
  y: number;
}

interface Line {
  a: Coordinate;
  b: Coordinate;
}

function calulateArea(a: Coordinate, b: Coordinate): number {
  return (Math.abs(b.x - a.x) + 1) * (Math.abs(b.y - a.y) + 1);
}

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

const inputList2: Coordinate[] = day9Input
  .split("\n")
  .map((line) => line.split(",").map(Number))
  .map(([x, y]) => ({ x, y }));

const horizontalLines: Line[] = [];
const verticalLines: Line[] = [];

for (let i = 0; i < inputList2.length - 1; i++) {
  const a = inputList2[i];
  for (let j = i + 1; j < inputList2.length; j++) {
    const b = inputList2[j];
    if (a.x === b.x) {
      verticalLines.push({ a, b });
    } else if (a.y === b.y) {
      horizontalLines.push({ a, b });
    }
  }
}

function getIsCross(lineA: Line, lineB: Line): boolean {
  // 取點
  const a1 = lineA.a;
  const a2 = lineA.b;
  const b1 = lineB.a;
  const b2 = lineB.b;
  // 檢查是否只在端點相交，如果是則返回 false
  const isEndpointIntersection =
    (a1.x === b1.x && a1.y === b1.y) || // a1 與 b1 重合
    (a1.x === b2.x && a1.y === b2.y) || // a1 與 b2 重合
    (a2.x === b1.x && a2.y === b1.y) || // a2 與 b1 重合
    (a2.x === b2.x && a2.y === b2.y); // a2 與 b2 重合

  if (isEndpointIntersection) {
    return false;
  }

  // 輔助函數：計算向量叉積
  function cross(x1: number, y1: number, x2: number, y2: number) {
    return x1 * y2 - y1 * x2;
  }

  // 檢查點c是否在線段ab上（修正：真正檢查是否在線段上，而不只是 bounding box）
  function onSegment(a: Coordinate, b: Coordinate, c: Coordinate): boolean {
    // 先檢查是否在 bounding box 內
    const minx = Math.min(a.x, b.x);
    const maxx = Math.max(a.x, b.x);
    const miny = Math.min(a.y, b.y);
    const maxy = Math.max(a.y, b.y);

    if (c.x < minx || c.x > maxx || c.y < miny || c.y > maxy) {
      return false;
    }

    // 檢查是否共線（叉積為 0）
    const crossProduct = cross(b.x - a.x, b.y - a.y, c.x - a.x, c.y - a.y);
    // 使用小的 epsilon 來處理浮點數誤差
    return Math.abs(crossProduct) < 1e-9;
  }

  // 處理 Infinity 的情況（射線的情況）
  const hasInfinity =
    !isFinite(a1.x) ||
    !isFinite(a1.y) ||
    !isFinite(a2.x) ||
    !isFinite(a2.y) ||
    !isFinite(b1.x) ||
    !isFinite(b1.y) ||
    !isFinite(b2.x) ||
    !isFinite(b2.y);

  if (hasInfinity) {
    // 對於射線，找到有限的那個端點
    let rayStart: Coordinate | null = null;
    let rayEnd: Coordinate | null = null;
    let segmentStart: Coordinate;
    let segmentEnd: Coordinate;

    if (
      !isFinite(a1.x) ||
      !isFinite(a1.y) ||
      !isFinite(a2.x) ||
      !isFinite(a2.y)
    ) {
      // lineA 是射線
      rayStart = isFinite(a1.x) && isFinite(a1.y) ? a1 : a2;
      rayEnd = isFinite(a1.x) && isFinite(a1.y) ? a2 : a1;
      segmentStart = b1;
      segmentEnd = b2;
    } else {
      // lineB 是射線
      rayStart = isFinite(b1.x) && isFinite(b1.y) ? b1 : b2;
      rayEnd = isFinite(b1.x) && isFinite(b1.y) ? b2 : b1;
      segmentStart = a1;
      segmentEnd = a2;
    }

    if (!rayStart || !rayEnd) return false;

    // 計算射線方向
    const dx = rayEnd.x - rayStart.x;
    const dy = rayEnd.y - rayStart.y;

    // 檢查線段是否與射線相交
    const segDx = segmentEnd.x - segmentStart.x;
    const segDy = segmentEnd.y - segmentStart.y;

    // 使用參數方程求解交點
    // rayStart + t * (rayEnd - rayStart) = segmentStart + s * (segmentEnd - segmentStart)
    // 簡化：假設射線是水平或垂直的
    if (Math.abs(dy) < 1e-9) {
      // 水平射線
      const y = rayStart.y;
      if (Math.abs(segDy) < 1e-9) {
        // 線段也是水平的
        if (Math.abs(segmentStart.y - y) < 1e-9) {
          const minSegX = Math.min(segmentStart.x, segmentEnd.x);
          const maxSegX = Math.max(segmentStart.x, segmentEnd.x);
          const rayDir = dx > 0 ? 1 : -1;
          if (rayDir > 0) {
            return rayStart.x <= maxSegX;
          } else {
            return rayStart.x >= minSegX;
          }
        }
        return false;
      }
      // 計算交點
      const t = (y - segmentStart.y) / segDy;
      if (t >= 0 && t <= 1) {
        const intersectX = segmentStart.x + t * segDx;
        const rayDir = dx > 0 ? 1 : -1;
        if (rayDir > 0) {
          return intersectX >= rayStart.x;
        } else {
          return intersectX <= rayStart.x;
        }
      }
    } else if (Math.abs(dx) < 1e-9) {
      // 垂直射線
      const x = rayStart.x;
      if (Math.abs(segDx) < 1e-9) {
        // 線段也是垂直的
        if (Math.abs(segmentStart.x - x) < 1e-9) {
          const minSegY = Math.min(segmentStart.y, segmentEnd.y);
          const maxSegY = Math.max(segmentStart.y, segmentEnd.y);
          const rayDir = dy > 0 ? 1 : -1;
          if (rayDir > 0) {
            return rayStart.y <= maxSegY;
          } else {
            return rayStart.y >= minSegY;
          }
        }
        return false;
      }
      // 計算交點
      const t = (x - segmentStart.x) / segDx;
      if (t >= 0 && t <= 1) {
        const intersectY = segmentStart.y + t * segDy;
        const rayDir = dy > 0 ? 1 : -1;
        if (rayDir > 0) {
          return intersectY >= rayStart.y;
        } else {
          return intersectY <= rayStart.y;
        }
      }
    }
    return false;
  }

  // 標準的線段相交判斷（兩條有限線段）
  // 快速排斥實驗(判斷bounding box是否重疊)
  if (
    Math.max(a1.x, a2.x) < Math.min(b1.x, b2.x) ||
    Math.max(b1.x, b2.x) < Math.min(a1.x, a2.x) ||
    Math.max(a1.y, a2.y) < Math.min(b1.y, b2.y) ||
    Math.max(b1.y, b2.y) < Math.min(a1.y, a2.y)
  ) {
    return false;
  }

  // 跨立實驗
  const d1 = cross(a2.x - a1.x, a2.y - a1.y, b1.x - a1.x, b1.y - a1.y);
  const d2 = cross(a2.x - a1.x, a2.y - a1.y, b2.x - a1.x, b2.y - a1.y);
  const d3 = cross(b2.x - b1.x, b2.y - b1.y, a1.x - b1.x, a1.y - b1.y);
  const d4 = cross(b2.x - b1.x, b2.y - b1.y, a2.x - b1.x, a2.y - b1.y);

  // 處理共線情況
  if (Math.abs(d1) < 1e-9 && onSegment(a1, a2, b1)) return true;
  if (Math.abs(d2) < 1e-9 && onSegment(a1, a2, b2)) return true;
  if (Math.abs(d3) < 1e-9 && onSegment(b1, b2, a1)) return true;
  if (Math.abs(d4) < 1e-9 && onSegment(b1, b2, a2)) return true;

  // 一般相交情況：兩線段互相跨立
  if ((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) {
    if ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0)) {
      return true;
    }
  }
  return false;
}

function validHorizontal(p: Coordinate) {
  const topLine = horizontalLines.filter((line) => line.a.y <= p.y);
  const crossCount = topLine.filter((line) =>
    getIsCross(line, { a: p, b: { x: p.x, y: 0 } })
  ).length;
  return crossCount % 2 === 1;
}

function validVertical(p: Coordinate) {
  const leftLine = verticalLines.filter((line) => line.a.x <= p.x);
  const crossCount = leftLine.filter((line) =>
    getIsCross(line, { a: p, b: { x: 0, y: p.y } })
  ).length;

  return crossCount % 2 === 1;
}
function checkPointIn(
  point: Coordinate,
  a: Coordinate,
  b: Coordinate
): boolean {
  const lx = Math.min(a.x, b.x);
  const rx = Math.max(a.x, b.x);
  const ty = Math.max(a.y, b.y);
  const by = Math.min(a.y, b.y);
  return point.x > lx && point.x < rx && point.y > by && point.y < ty;
}

function check(a: Coordinate, b: Coordinate): boolean {
  const centerPoint = {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
  };
  if (!validVertical(centerPoint) || !validHorizontal(centerPoint)) {
    return false;
  }
  for (let i = 0; i < inputList2.length; i++) {
    if (checkPointIn(inputList2[i], a, b)) {
      return false;
    }
    const pointA = inputList2[i];
    const pointB =
      i === inputList2.length - 1 ? inputList2[0] : inputList2[i + 1];
    const lineA = { a: pointA, b: pointB };
    const lineB = { a: a, b: b };
    if (getIsCross(lineA, lineB)) {
      return false;
    }
  }
  return true;
}

let max2 = 0;
let maxPos2: { a: Coordinate; b: Coordinate } = {
  a: { x: 0, y: 0 },
  b: { x: 0, y: 0 },
};

for (let i = 0; i < inputList2.length - 1; i++) {
  for (let j = i + 1; j < inputList2.length; j++) {
    const a = inputList2[i];
    const b = inputList2[j];
    const area = calulateArea(a, b);
    if (area > max2) {
      const isValid = check(a, b);
      if (isValid) {
        max2 = area;
        maxPos2 = { a, b };
      }
    }
  }
}

console.log("max2", max2);
console.log("maxPos2", maxPos2);
