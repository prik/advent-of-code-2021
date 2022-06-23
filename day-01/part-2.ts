import { readFileSync } from 'fs';
import path from 'path';

const SLIDING_WINDOW_SIZE = 3;

const depthData: number[] = readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n')
  .map(Number);

let depthIncreaseCount: number = 0;
const slidingWindows: number[] = [];

const isDepthIncreased = (currentDepth: number, previousDepth: number): boolean => currentDepth > previousDepth;

const createSlidingWindows = (): void => {
  for (let index = SLIDING_WINDOW_SIZE - 1; index < depthData.length; index++) {
    let slidingWindowDepth = 0;
    for (let i = index; i > index - SLIDING_WINDOW_SIZE; i--) {
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
