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

const processDay = (fishLifespan: number, index: number) => {
  if (fishLifespan === DEAD) {
    fishLifespan = REVIVED_LIFESPAN;
    lanternFish.push(NEW_LIFESPAN);
  } else if (fishLifespan > 0) {
    fishLifespan--;
  }

  lanternFish.splice(index, UPDATE, fishLifespan);
};

const simulateFishGrowth = (): void => {
  for (let day = 1; day <= SIMULATION_DAYS; day++) {
    lanternFish.forEach((fishLifespan, index) => processDay(fishLifespan, index));
  }
};

simulateFishGrowth();

console.log(`Lanternfish count after ${SIMULATION_DAYS} days: ${lanternFish.length}`);
