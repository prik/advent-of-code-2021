import { Dir, readFileSync } from 'fs';
import path from 'path';

enum Direction {
  Forward = "forward",
  Down = "down",
  Up = "up",
}

const courseInstructions: string[][] = readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n')
  .map((course) => [course.split(' ')[0], course.split(' ')[1]]);

let horizontalPosition = 0;
let depth = 0;

courseInstructions.forEach((course) => {
  const direction: string = course[0];
  const units: number = Number(course[1]);

  switch (direction) {
    case Direction.Forward:
      horizontalPosition += units;
      break;
    case Direction.Down:
      depth += units;
      break;
    case Direction.Up:
      depth -= units;
      break;
    default:
      break;
  }
});

const finalPosition = horizontalPosition * depth;

console.log(`Final position: ${finalPosition}`);
