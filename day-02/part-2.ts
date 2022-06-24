import { readFileSync } from 'fs';
import path from 'path';

enum Direction {
  Forward = "forward",
  Down = "down",
  Up = "up",
}

const courseInstructions: string[][] = readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n')
  .map((course: string) => [course.split(' ')[0], course.split(' ')[1]]);

let horizontalPosition: number = 0;
let depth: number = 0;
let aim: number = 0;

courseInstructions.forEach((instruction): void => {
  const direction: string = instruction[0];
  const units: number = Number(instruction[1]);

  switch (direction) {
    case Direction.Forward:
      horizontalPosition += units;
      depth += (aim * units);
      break;
    case Direction.Down:
      aim += units;
      break;
    case Direction.Up:
      aim -= units;
      break;
    default:
      break;
  }
});

const finalPosition = horizontalPosition * depth;

console.log(`Final position: ${finalPosition}`);
