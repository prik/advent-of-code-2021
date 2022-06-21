import { readFileSync } from 'fs';
import path from 'path';

const depthData: number[] = readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n')
  .map(Number);

let depthIncreaseCount: number = 0;

const isDepthIncreased = (currentDepth: number, previousDepth: number): boolean => currentDepth > previousDepth;

const countDepthIncreases = (): void => {
  for (let index = 1; index < depthData.length; index++) {
    if (isDepthIncreased(depthData[index], depthData[index - 1])) {
      depthIncreaseCount++;
    }
  }
};

countDepthIncreases();

console.log(`Depth increases: ${depthIncreaseCount}`);
