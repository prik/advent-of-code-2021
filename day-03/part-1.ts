import { readFileSync } from 'fs';
import path from 'path';

const diagnosticReport = readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8').split('\n');

const createBitPositionColunms = (source: string[]): string[][] => {
  const bitSize = source[0].length;
  const bitPositionColumns = Array(bitSize).fill([]).map(() => Array(0));
  source.forEach((byteRow) => [...byteRow].forEach((bit, index) => bitPositionColumns[index].push(bit)));

  return bitPositionColumns;
};

const getMostCommonValueAtBitPosition = ((column: string[]) => {
  const zeroCount = column.filter((x: string) => x === '0').length;
  const oneCount = column.filter((x: string) => x === '1').length;

  return zeroCount > oneCount ? '0' : '1';
});

const getGammaAndEpsilonRates = (columns: string[][]): string[] => {
  let gammaRate: string = '';
  let epsilonRate: string = '';

  columns.forEach((column: string[]) => {
    const mostCommonValue = getMostCommonValueAtBitPosition(column);
    gammaRate += mostCommonValue === '0' ? '0' : '1';
    epsilonRate += mostCommonValue === '0' ? '1' : '0';
  });

  return [gammaRate, epsilonRate];
};

const bitPositionColumns = createBitPositionColunms(diagnosticReport);
const [gammaRateString, epsilonRateString] = getGammaAndEpsilonRates(bitPositionColumns);
const powerConsumption: number = parseInt(gammaRateString, 2) * parseInt(epsilonRateString, 2);

console.log(`Power consumption: ${powerConsumption}`);
