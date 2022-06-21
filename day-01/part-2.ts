import { readFileSync } from 'fs';
import path from 'path';

const depthData: number[] = readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n')
  .map(Number);

let depthIncreaseCount: number = 0;
const slidingWindowSize: number = 3;
const slidingWindows: number[] = [];

const isDepthIncreased = (currentDepth: number, previousDepth: number): boolean => currentDepth > previousDepth;

const createSlidingWindows = (): void => {
  for (let index = slidingWindowSize - 1; index < depthData.length; index++) {
    let slidingWindowDepth = 0;
    for (let i = index; i > index - slidingWindowSize; i--) {
      slidingWindowDepth += depthData[i];
    }
    slidingWindows.push(slidingWindowDepth);
  }
};

const countDepthIncreases = (): void => {
  for (let index = 0; index < slidingWindows.length; index++) {
    if (isDepthIncreased(slidingWindows[index], slidingWindows[index - 1])) {
      depthIncreaseCount++;
    }
  }
};

createSlidingWindows();
countDepthIncreases();

console.log(`Depth increases: ${depthIncreaseCount}`);
