import { readFileSync } from 'fs';
import path from 'path';

const SIMULATION_DAYS = 80;
const NEW_LIFESPAN = 8;
const REVIVED_LIFESPAN = 6;
const UPDATE = 1;

const lanternFish: number[] = readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
  .split(',')
  .map(Number);

const processDailyAgeing = (daysToLive: number, fishIndex: number) => {
  if (daysToLive === 0) {
    daysToLive = REVIVED_LIFESPAN;
    lanternFish.push(NEW_LIFESPAN);
  } else if (daysToLive > 0) {
    daysToLive--;
  }

  lanternFish.splice(fishIndex, UPDATE, daysToLive);
};

const simulateFishGrowth = (): void => {
  for (let day = 1; day <= SIMULATION_DAYS; day++) {
    lanternFish.forEach((fishLifespan, fishIndex) => processDailyAgeing(fishLifespan, fishIndex));
  }
};

simulateFishGrowth();

console.log(`Lanternfish count after ${SIMULATION_DAYS} days: ${lanternFish.length}`);
