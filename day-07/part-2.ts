import { readFileSync } from 'fs';
import path from 'path';

const postions: number[] = readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
  .split(',')
  .map(Number);

interface PositionFuelCost {
  position: number,
  fuel: number,
}

const firstPosition: number = Math.min(...postions);
const lastPosition: number = Math.max(...postions);

let mostEfficientPosition: PositionFuelCost = {
  position: firstPosition,
  fuel: 0,
};

const getTriangularValue = ((number: number) => (number * (number + 1)) / 2);

const getFuelNeededForPosition = ((position: number): number => {
  let currentPositionFuel = 0;

  for (const currentPosition of postions) {
    const steps = Math.abs(position - currentPosition);
    currentPositionFuel += getTriangularValue(steps);

    if (currentPositionFuel > mostEfficientPosition.fuel && position !== firstPosition) {
      continue;
    }
  }

  return currentPositionFuel;
});

const calculateMostEfficientPosition = (): void => {
  for (let position = firstPosition; position <= lastPosition; position++) {
    const fuel = getFuelNeededForPosition(position);

    if (fuel < mostEfficientPosition.fuel || position === firstPosition) {
      mostEfficientPosition = { position, fuel };
    }
  }
};

calculateMostEfficientPosition();

console.log(`On position ${mostEfficientPosition.position}, the crabs spend the least amount of fuel: ${mostEfficientPosition.fuel}`);
