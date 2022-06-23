import { readFileSync } from 'fs';
import path from 'path';

const FORWARD = 'forward';
const DOWN = 'down';
const UP = 'up';

const courseInstructions: string[][] = readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n')
  .map((course) => [course.split(' ')[0], course.split(' ')[1]]);

let horizontalPosition = 0;
let depth = 0;

courseInstructions.forEach((course) => {
  const direction: string = course[0];
  const units: number = Number(course[1]);

  switch (direction) {
    case FORWARD:
      horizontalPosition += units;
      break;
    case DOWN:
      depth += units;
      break;
    case UP:
      depth -= units;
      break;
    default:
      break;
  }
});

const finalPosition = horizontalPosition * depth;

console.log(`Final position: ${finalPosition}`);
