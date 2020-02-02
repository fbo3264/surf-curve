import {
    INPUT_ACTION,
    ROTATE_BOOST_DURATION,
    ROTATE_BOOST_FACTOR,
    ROTATION_STEP,
    TRANSLATION_STEP
} from '../../constants';
import {Point} from './Point';
import {GameLogic} from "../shared/GameLogic";
import {Injectable} from "@angular/core";
import {CollisionDetector} from "../shared/CollisionDetector";

export class BoostReservoir {
    private isRecharging: boolean;
    rotateBoostPressed: boolean;
    startRotatePressedMs: number;

    constructor() {
        this.isRecharging = false;
    }

    canActivate() {
        const now = GameLogic.timestamp();
        this.isRecharging = false;
        if (!this.rotateBoostPressed) {
            return false;
        }
        if (this.startRotatePressedMs + ROTATE_BOOST_DURATION > now) {
            return true;
        }
        if (this.startRotatePressedMs + ROTATE_BOOST_DURATION * 2 < now) {
            this.startRotatePressedMs = now;
            return true;
        }
        this.isRecharging = true;
        return false;

    }

    getBoostAmount() {
        return ROTATE_BOOST_FACTOR;
    }

    handleBoostPressed(released = false) {
        if (released) {
            this.rotateBoostPressed = false;
        } else {
            if (!this.rotateBoostPressed) {
                this.startRotatePressedMs = GameLogic.timestamp();
            }
            this.rotateBoostPressed = true;
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
    private boostReservoir = new BoostReservoir();
    private collisionDetector: CollisionDetector;
    alive: boolean = true;
    strokeStyle: string;

    constructor(private readonly ctx: CanvasRenderingContext2D, private readonly name: string,
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
        if (this.boostReservoir.canActivate()) {
            rotationStep = rotationStep * this.boostReservoir.getBoostAmount();
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
        CollisionDetector.put(this.currPosition);

    }

    doAction(cmd: INPUT_ACTION, keyReleased?: boolean) {
        if (keyReleased && (cmd == INPUT_ACTION.ROTATE_RIGHT || cmd == INPUT_ACTION.ROTATE_LEFT)) {
            this.leftPressed = false;
            this.rightPressed = false;
        } else if (keyReleased && cmd === INPUT_ACTION.ROTATE_BOOST) {
            this.boostReservoir.handleBoostPressed(true);
        } else {
            if (cmd === INPUT_ACTION.ROTATE_LEFT) {
                this.leftPressed = true;
                this.rightPressed = false;
            } else if (cmd === INPUT_ACTION.ROTATE_RIGHT) {
                this.leftPressed = false;
                this.rightPressed = true;
            } else if (cmd === INPUT_ACTION.ROTATE_BOOST) {
                this.boostReservoir.handleBoostPressed();
            }
        }
    }

    draw() {
        this.ctx.strokeStyle = '#FF0000';
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
