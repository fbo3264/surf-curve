import {Point} from "./Point";
import {GameBoardComponent} from "../game-board/game-board.component";
import {GameHelper} from "./GameHelper";

export class CollisionDetector {
    constructor(private readonly ctx: CanvasRenderingContext2D) {

    }

    static collisionBoxes = [];

    static put(point) {
        // calc box around point
        // x = 100, y = 90 -> 95, 105, 85, 95
        this.collisionBoxes.push(point.getPointBox());
    }

    static hasCollision(point: Point) {
        return false;
        if (point.x >= GameHelper.GAME_BOARD_WIDTH || point.x < 0 || point.y < 0 || point.y >= GameHelper.GAME_BOARD_HEIGHT) {
            return true;
        }
        for (const box of this.collisionBoxes) {
            if (point.x > box.topRight.x || point.x < box.topLeft.x) {
                continue;
            } else if (point.y > box.bottomLeft.y || point.y < box.topLeft.y) {
                continue;
            } else {
                return true;
            }
        }
        return false;
    }


    static reset() {
        this.collisionBoxes = []
    }
}