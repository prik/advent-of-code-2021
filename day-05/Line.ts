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

  private setCoordinates(): void {
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

  private setHorizontalCoordinates(): void {
    const [minX, maxX] = Line.getLowestAndHighestCoordinates(this.start.x, this.end.x);

    for (let x = minX; x <= maxX; x++) {
      this.coordinates.push({ x, y: this.start.y });
    }
  }

  private setVerticalCoordinates(): void {
    const [minY, maxY] = Line.getLowestAndHighestCoordinates(this.start.y, this.end.y);

    for (let y = minY; y <= maxY; y++) {
      this.coordinates.push({ x: this.start.x, y });
    }
  }

  private setDiagonalCoordinates(): void {
    const [startCoord, endCoord] = Line.sortDiagonalCoordinates(this.start, this.end)
    const isAscending = endCoord.y > startCoord.y;
    let y = startCoord.y;

    for (let x = startCoord.x; x <= endCoord.x; x++) {
      this.coordinates.push({ x, y });
      isAscending ? y++: y--;
    }
  }

  private static getLowestAndHighestCoordinates(start: number, end: number): number[] {
    const lowestCoord = Math.min(start, end);
    const highestCoord = Math.max(start, end);

    return [lowestCoord, highestCoord];
  }
  
  private static sortDiagonalCoordinates(start: Coordinate, end: Coordinate): Coordinate[] {
    return [start, end].sort((a, b) => a.x - b.x)
  }
}
