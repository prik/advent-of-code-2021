import { readFileSync } from 'fs';
import path from 'path';

const SIMULATION_DAYS = 256;
const DISTINCT_AGES = 9;
const NEW_LIFE_AGE = 8;
const REVIVED_LIFE_AGE = 6;

const initialFishAges: number[] = readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
  .split(',')
  .map(Number);

const fishAgeCounters: number[] = new Array(DISTINCT_AGES).fill(0);
initialFishAges.forEach((age): number => fishAgeCounters[age]++);

const processDailyAgeing = (): void => {
  const newLifeAndRevivalCount: number = fishAgeCounters.shift() || 0;
  fishAgeCounters[NEW_LIFE_AGE] = newLifeAndRevivalCount;
  fishAgeCounters[REVIVED_LIFE_AGE] += newLifeAndRevivalCount;
};

const simulateFishGrowth = (): void => {
  for (let day = 1; day <= SIMULATION_DAYS; day++) {
    processDailyAgeing();
  }
};

const totalFishCount = () => fishAgeCounters.reduce((prevSum, currentAgeCount) => prevSum + currentAgeCount);

simulateFishGrowth();

console.log(`Lanternfish count after ${SIMULATION_DAYS} days: ${totalFishCount()}`);
