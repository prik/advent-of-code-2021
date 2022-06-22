import { BingoCard } from './BingoCard';

// Bingo subsystem output data constants
const STARTING_ROW_OF_CARDS: number = 2;
const ROWS_BETWEEN_CARDS: number = 6;
const ROWS_IN_CARD: number = 5;

export class BingoGame {
  subsystemOutput: string[];
  cards: BingoCard[] = [];
  numberPool: number[] = [];
  winningNumber?: number;
  winnerCard?: BingoCard;

  constructor(bingoSubsystemOutput: string[]) {
    this.subsystemOutput = bingoSubsystemOutput;
    this.createBingoCards();
    this.setDrawingNumbers();
  }

  private createBingoCards() {
    for (let i = STARTING_ROW_OF_CARDS; i < this.subsystemOutput.length; i += ROWS_BETWEEN_CARDS) {
      const cardId = this.cards.length + 1;
      const cardData = this.subsystemOutput.slice(i, i + ROWS_IN_CARD);
      this.cards.push(new BingoCard(cardId, cardData));
    }
  }

  private setDrawingNumbers() {
    this.numberPool = this.subsystemOutput[0]
      .split(',')
      .map(Number);
  }

  private markCards(numberDrawn: number) {
    return this.cards.find((card) => {
      card.markNumber(numberDrawn);

      return this.checkBingo(card);
    });
  }

  private checkBingo(card: BingoCard) {
    const isBingo = card.hasBingo();
    if (isBingo) this.winnerCard = card;

    return isBingo;
  }

  playToWin() {
    this.winningNumber = this.numberPool.find((numberDrawn) => this.markCards(numberDrawn));
  }

  playToLose() {
    while (this.cards.length > 0) {
      this.playToWin();
      this.removeWinnerCard();
    }
  }

  private removeWinnerCard() {
    this.cards.splice(this.cards.findIndex((card) => card.id === this.winnerCard!.id), 1);
  }
}
