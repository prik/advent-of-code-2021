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

const findRating = (collection: string[], occurenceAmount: 'mostOccurences' | 'leastOccurences') => {
  let column = 0;
  while (collection.length > 1) {
    const columns = createBitPositionColunms(collection);
    const mostCommonValue = getMostCommonValueAtBitPosition(columns[column]);
    if (occurenceAmount === 'mostOccurences') {
      collection = collection.filter((byteRow) => byteRow[column] === mostCommonValue);
    } else {
      collection = collection.filter((byteRow) => byteRow[column] !== mostCommonValue);
    }
    column++;
  }

  return collection[0];
};

const oxygenGeneratorRating: string = findRating([...diagnosticReport], 'mostOccurences');
const co2ScrubberRating: string = findRating([...diagnosticReport], 'leastOccurences');
const lifeSupportRating: number = parseInt(oxygenGeneratorRating, 2) * parseInt(co2ScrubberRating, 2);

console.log(`Life support rating: ${lifeSupportRating}`);
