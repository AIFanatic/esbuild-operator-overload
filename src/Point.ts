export class Point {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public add(p: Point | number): Point {
        const x = p instanceof Point ? p.x : p;
        const y = p instanceof Point ? p.y : p;
        return new Point(this.x + x, this.y + y);
    }

    public radd(p: Point | number): Point {
        const x = p instanceof Point ? p.x : p;
        const y = p instanceof Point ? p.y : p;
        return new Point(x + this.x, y + this.y);
    }

    public mul(p: Point | number): Point {
        const x = p instanceof Point ? p.x : p;
        const y = p instanceof Point ? p.y : p;
        return new Point(this.x * x, this.y * y);
    }

    public rmul(p: Point | number): Point {
        const x = p instanceof Point ? p.x : p;
        const y = p instanceof Point ? p.y : p;
        return new Point(x * this.x, y * this.y);
    }

    public pow(p: Point | number): Point {
        const x = p instanceof Point ? p.x : p;
        const y = p instanceof Point ? p.y : p;
        return new Point(this.x ** x, this.y ** y);
    }

    public gt(p: Point | number): [boolean, boolean] {
        const x = p instanceof Point ? p.x : p;
        const y = p instanceof Point ? p.y : p;
        return [this.x > x, this.y > y];
    }

    public ge(p: Point | number): [boolean, boolean] {
        const x = p instanceof Point ? p.x : p;
        const y = p instanceof Point ? p.y : p;
        return [this.x >= x, this.y >= y];
    }

    public lt(p: Point | number): [boolean, boolean] {
        const x = p instanceof Point ? p.x : p;
        const y = p instanceof Point ? p.y : p;
        return [this.x < x, this.y < y];
    }

    public le(p: Point | number): [boolean, boolean] {
        const x = p instanceof Point ? p.x : p;
        const y = p instanceof Point ? p.y : p;
        return [this.x <= x, this.y <= y];
    }

    public eq(p: Point | number): [boolean, boolean] {
        const x = p instanceof Point ? p.x : p;
        const y = p instanceof Point ? p.y : p;
        return [this.x == x, this.y == y];
    }

    public sum(): number {
        return this.x + this.y;
    }

    public toString(): string {
        return `Point(x: ${this.x}, y: ${this.y})`;
    }
}