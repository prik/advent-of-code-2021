import { readFileSync } from 'fs';
import path from 'path';

const SIMULATION_DAYS = 80;
const DEAD = 0;
const NEW_LIFESPAN = 8;
const REVIVED_LIFESPAN = 6;
const UPDATE = 1;

const lanternFish: number[] = readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
  .split(',')
  .map(Number);

const processDay = (fishAge: number, index: number) => {
  if (fishAge === DEAD) {
    fishAge = REVIVED_LIFESPAN;
    lanternFish.push(NEW_LIFESPAN);
  } else if (fishAge > 0) {
    fishAge--;
  }

  lanternFish.splice(index, UPDATE, fishAge);
};

const simulateFishGrowth = (): void => {
  for (let day = 1; day <= SIMULATION_DAYS; day++) {
    lanternFish.forEach((fishAge, index) => processDay(fishAge, index));
  }
};

simulateFishGrowth();

console.log(`Lanternfish count after ${SIMULATION_DAYS} days: ${lanternFish.length}`);
