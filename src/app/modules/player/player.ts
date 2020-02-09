import {
    GAP_STEP_SIZE,
    INPUT_ACTION,
    ROTATE_BOOST_DURATION,
    ROTATE_BOOST_FACTOR,
    ROTATION_STEP,
    TRANSLATION_STEP
} from '../../constants';
import {GameHelper} from "../shared/GameHelper";
import {Point} from "../shared/Point";
import {CollisionDetector} from "../shared/CollisionDetector";

export class BoostFeature {
    isActive: boolean = false;
    isRequested: boolean = false;

    getBoostAmount() {
        return ROTATE_BOOST_FACTOR;
    }


    request(isRequested = true) {
        this.isRequested = isRequested;
    }
}

export class GapFeature {
    private lastGapCheck = GameHelper.timestamp();
    private gapStepCount = 0;
    isActive = false;

    canActivate() {
        const now = GameHelper.timestamp();
        if (this.lastGapCheck + 5000 < now) {
            this.lastGapCheck = now;
            const rnd = Math.random();
            if (rnd < 0.15) {
                return true;
            }
        }
        return false;
    }

    activate() {
        this.isActive = true;
    }

    increaseGapCount() {
        this.gapStepCount++;
        if (this.gapStepCount >= GAP_STEP_SIZE) {
            this.isActive = false;
            this.gapStepCount = 0;
        }
    }
}

export class Player {
    private lastPosition: Point;
    private currPosition: Point;
    private currAngleDeg: number;
    private leftPressed?: boolean;
    private rightPressed?: boolean;
    private lineWidth: number;
    boostFeature = new BoostFeature();
    private gapFeature = new GapFeature();
    private collisionDetector: CollisionDetector;
    alive: boolean = true;
    strokeStyle: string;

    constructor(private readonly ctx: CanvasRenderingContext2D, readonly name: string,
                point: Point, angle: number, color: string) {
        this.currPosition = new Point(point.x, point.y);
        this.lastPosition = new Point(this.currPosition.x, this.currPosition.y);
        this.currAngleDeg = angle;
        this.strokeStyle = color;
        this.lineWidth = 5;
        this.collisionDetector = new CollisionDetector(ctx);
    }

    move() {
        let rotationStep = ROTATION_STEP;
        if (this.boostFeature.isActive) {
            rotationStep = rotationStep * this.boostFeature.getBoostAmount();
        }
        if (this.leftPressed) {
            this.currAngleDeg -= rotationStep;
        } else if (this.rightPressed) {
            this.currAngleDeg += rotationStep;
        }
        this.lastPosition.x = this.currPosition.x;
        this.lastPosition.y = this.currPosition.y;
        const currAngle = (Math.PI / 180) * this.currAngleDeg;

        const newX = this.currPosition.x + Math.cos(currAngle) * TRANSLATION_STEP;
        const newY = this.currPosition.y + Math.sin(currAngle) * TRANSLATION_STEP;
        this.currPosition.x = newX;
        this.currPosition.y = newY;
        if (CollisionDetector.hasCollision(this.currPosition)) {
            this.alive = false;
        }
        // check if can set the player into gap mode
        if (!this.gapFeature.isActive && this.gapFeature.canActivate()) {
            this.gapFeature.activate();
        }
        if (!this.gapFeature.isActive) {
            CollisionDetector.put(this.currPosition);
        } else {
            this.gapFeature.increaseGapCount();
        }
    }


    doAction(cmd: INPUT_ACTION, keyReleased?: boolean) {
        if (keyReleased) {
            if (cmd === INPUT_ACTION.ROTATE_LEFT) {
                this.leftPressed = false;
            } else if (cmd === INPUT_ACTION.ROTATE_RIGHT) {
                this.rightPressed = false;
            } else if (cmd === INPUT_ACTION.ROTATE_BOOST) {
                this.boostFeature.request(false);
            }
        } else {
            if (cmd === INPUT_ACTION.ROTATE_LEFT) {
                this.leftPressed = true;
            } else if (cmd === INPUT_ACTION.ROTATE_RIGHT) {
                this.rightPressed = true;
            } else if (cmd === INPUT_ACTION.ROTATE_BOOST) {
                this.boostFeature.request();
            }
        }
    }

    draw() {
        if (this.gapFeature.isActive) return;
        this.ctx.beginPath();
        this.ctx.moveTo(this.lastPosition.x, this.lastPosition.y);
        this.ctx.lineTo(this.currPosition.x, this.currPosition.y);
        this.ctx.strokeStyle = this.strokeStyle;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.lineCap = "round";
        this.ctx.stroke();
        this.ctx.closePath();

    }

}
