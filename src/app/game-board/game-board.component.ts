import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {
    COLORS,
    DEFAULT_KEYMAP,
    FIELD_HEIGHT,
    FIELD_WIDTH,
    GAME_LOOP_INTERVAL,
    INPUT_ACTION,
    START_POSITIONS
} from '../../constants';
import {Player} from '../player/player';
import {ToastrService} from "ngx-toastr";
import {Notification} from "../shared/Notification";
import {GameLogic} from "../shared/GameLogic";
import {CollisionDetector} from "../shared/CollisionDetector";

@Component({
    selector: 'app-game-board',
    templateUrl: './game-board.component.html',
    styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
    @ViewChild('board', {static: true})
    private canvas: ElementRef<HTMLCanvasElement>;

    private players: Player[] = [];
    private ctx: CanvasRenderingContext2D;
    private keyPlayerActionMap: Record<string, { player: Player; action: INPUT_ACTION }> = {};
    private time = {last: GameLogic.timestamp(), intervalMs: GAME_LOOP_INTERVAL};
    private gameRunning = false;

    constructor(private readonly gameLogic: GameLogic) {
    }

    ngOnInit() {
        this.initBoard();
        this.addPlayer();
        // this.addPlayer();
    }

    private initBoard() {
        this.ctx = this.canvas.nativeElement.getContext('2d');

        // Calculate size of canvas from constants.
        this.ctx.canvas.width = FIELD_WIDTH;
        this.ctx.canvas.height = FIELD_HEIGHT;

        // Scale so we don't need to give size on every draw.
        // this.ctx.scale(10, 10);
    }

    startGame() {
        //  TODO verify player amount and readiness
        this.gameRunning = true;
        this.redraw();
    }

    redraw() {
        const alivePlayers = this.players.filter(p => p.alive);
        if (this.checkWinner(alivePlayers) || !this.gameRunning) {
            return;
        }
        const now = GameLogic.timestamp();
        const dt = (now - this.time.last);
        if (dt >= this.time.intervalMs) {
            alivePlayers.forEach(p => p.move());
            alivePlayers.forEach(p => p.draw());
            this.time.last = now;
        }
        requestAnimationFrame(this.redraw.bind(this));
    }

    checkWinner(alivePlayers: Player[]) {
        if (this.players.length > 1 && alivePlayers.length == 1) {
            alert(`Player ${alivePlayers[0].strokeStyle} won the game!`);
            return true;
        }
        return false;
    }

    @HostListener('window:keydown', ['$event'])
    keyDownEvent(event: KeyboardEvent) {
        if (this.keyPlayerActionMap[event.keyCode]) {
            event.preventDefault();
            const {player, action} = this.keyPlayerActionMap[event.keyCode];
            player.doAction(action);
        }
    }

    @HostListener('window:keyup', ['$event'])
    keyUpEvent(event: KeyboardEvent) {
        if (this.keyPlayerActionMap[event.keyCode]) {
            event.preventDefault();
            const {player, action} = this.keyPlayerActionMap[event.keyCode];
            player.doAction(action, true);
        }
    }

    addPlayer() {
        const {point, angle} = START_POSITIONS[this.players.length];
        const color = COLORS[this.players.length];
        const player = new Player(this.ctx, this.players.length.toString(), point, angle, color);
        const keyActions = DEFAULT_KEYMAP[this.players.length];

        keyActions.forEach(keyActionMap => this.keyPlayerActionMap[keyActionMap.code] = {
            player,
            action: keyActionMap.action
        });
        this.players.push(player);
    }

    resetGame() {
        this.ctx.clearRect(0, 0, FIELD_WIDTH, FIELD_HEIGHT);
        const nrOfPlayers = this.players.length;
        this.players = [];
        for (let i = 0; i < nrOfPlayers; i++) {
            this.addPlayer();
        }
        CollisionDetector.reset();
        this.gameRunning = false;
    }
}
