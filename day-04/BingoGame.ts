import { BingoCard } from './BingoCard';

const STARTING_ROW_OF_CARDS: number = 2;
const ROWS_BETWEEN_CARDS: number = 1;
const ROWS_IN_CARD: number = 5;

interface WinnerInfo {
  winnerCard: BingoCard,
  winningNumber: number,
}

export class BingoGame {
  subsystemOutput: string[];
  cards: BingoCard[] = [];
  numberSequence: number[] = [];
  winners: WinnerInfo[] = [];

  constructor(bingoSubsystemOutput: string[]) {
    this.subsystemOutput = bingoSubsystemOutput;
    this.createBingoCards();
    this.setDrawingNumbers();
    this.play();
  }

  public getWinner(): WinnerInfo | undefined {
    return this.winners[0];
  }

  public getLastWinner(): WinnerInfo | undefined {
    return this.winners[this.winners.length - 1];
  }

  private createBingoCards() {
    for (let i = STARTING_ROW_OF_CARDS; i < this.subsystemOutput.length; i += (ROWS_IN_CARD + ROWS_BETWEEN_CARDS)) {
      const cardData = this.subsystemOutput.slice(i, i + ROWS_IN_CARD);
      this.cards.push(new BingoCard(cardData));
    }
  }

  private setDrawingNumbers() {
    this.numberSequence = this.subsystemOutput[0]
      .split(',')
      .map(Number);
  }

  private drawNumber(numberDrawn: number) {
    this.cards.forEach((card) => {
      const cardHasAlreadyWon = this.winners.find((winner) => winner.winnerCard === card);
      if (cardHasAlreadyWon) return;

      card.markNumber(numberDrawn);

      if (card.hasBingo()) {
        this.winners.push({
          winnerCard: card,
          winningNumber: numberDrawn,
        });
      }
    });
  }

  private play() {
    this.numberSequence.forEach((numberDrawn) => this.drawNumber(numberDrawn));
  }
}
