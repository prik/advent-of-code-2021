export interface Coordinate {
  x: number;
  y: number;
}

export class Line {
  start: Coordinate;
  end: Coordinate;
  coordinates: Coordinate[] = [];

  constructor(start: Coordinate, end: Coordinate) {
    this.start = start;
    this.end = end;

    this.setCoordinates();
  }

  private setCoordinates() {
    if (this.isHorizontal()) {
      this.setHorizontalCoordinates();
    } else if (this.isVertical()) {
      this.setVerticalCoordinates();
    } else {
      this.setDiagonalCoordinates();
    }
  }

  private isHorizontal(): boolean {
    return this.start.y === this.end.y;
  }

  private isVertical(): boolean {
    return this.start.x === this.end.x;
  }

  private setHorizontalCoordinates() {
    const [min, max] = Line.getLowestAndHighestCoordinates(this.start.x, this.end.x);

    for (let x = min; x <= max; x++) {
      this.coordinates.push({ x, y: this.start.y });
    }
  }

  private setVerticalCoordinates() {
    const [min, max] = Line.getLowestAndHighestCoordinates(this.start.y, this.end.y);

    for (let y = min; y <= max; y++) {
      this.coordinates.push({ x: this.start.x, y });
    }
  }

  private setDiagonalCoordinates() {
    //
  }

  private static getLowestAndHighestCoordinates(start: number, end: number) {
    const lowestCoord = Math.min(start, end);
    const highestCoord = Math.max(start, end);

    return [lowestCoord, highestCoord];
  }
}
