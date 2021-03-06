const boxSize = 1;

export interface CollisionBox {
    topLeft: Point;
    topRight: Point;
    bottomRight: Point;
    bottomLeft: Point;
}

export class Point {
    constructor(private _x: number, private _y: number) {

    }

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }

    toKey() {
        const key = `${(this.x.toFixed(3))},${this.y.toFixed(3)}`;
        return key;
    }

    getCollisionBox(): CollisionBox {

        const topLeftX = this.x - boxSize;
        const topLeftY = this.y - boxSize;

        const topRightX = this.x + boxSize;
        const topRightY = this.y - boxSize;

        const bottomLeftX = this.x - boxSize;
        const bottomLeftY = this.y + boxSize;

        const bottomRightX = this.x + boxSize;
        const bottomRightY = this.y + boxSize;
        const topLeft = new Point(topLeftX, topLeftY);
        const topRight = new Point(topRightX, topRightY);
        const bottomLeft = new Point(bottomLeftX, bottomLeftY);
        const bottomRight = new Point(bottomRightX, bottomRightY);
        return {topLeft, topRight, bottomRight, bottomLeft};
    }

}
