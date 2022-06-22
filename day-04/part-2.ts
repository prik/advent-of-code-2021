import { readFileSync } from 'fs';
import path from 'path';
import { BingoGame } from './BingoGame';

const bingoSubsystemOutput = readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8').split('\n');
const bingo = new BingoGame(bingoSubsystemOutput);

bingo.playToLose();

console.log(`BINGO! Ohh wait, I'm last.... On card #${bingo.winnerCard!.id} with an unmarked numbers sum of ${bingo.winnerCard!.getSumOfUnmarkedNumbers()} by number ${bingo.winningNumber!}.`);
console.log('');
console.log(`Final score: ${bingo.winnerCard!.getSumOfUnmarkedNumbers() * bingo.winningNumber!}`);
