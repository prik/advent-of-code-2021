import { readFileSync } from 'fs';
import path from 'path';
import { BingoGame } from './BingoGame';

const bingoSubsystemOutput = readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8').split('\n');
const bingo = new BingoGame(bingoSubsystemOutput);

const winnerInfo = bingo.getWinner();

if (winnerInfo) {
  console.log(`BINGO! With an unmarked numbers sum of ${winnerInfo.winnerCard.getSumOfUnmarkedNumbers()} by number draw ${winnerInfo.winningNumber!}.`);
  console.log('');
  console.log(`Final score: ${winnerInfo.winnerCard.getSumOfUnmarkedNumbers() * winnerInfo.winningNumber}`);
} else {
  console.log('There is no winner!');
}
