import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {
    DEFAULT_KEYMAP,
    GAME_LOOP_INTERVAL,
    INPUT_ACTION,
} from '../../constants';
import {Player} from '../player/player';
import {GameHelper} from "../shared/GameHelper";
import {CollisionDetector} from "../shared/CollisionDetector";

@Component({
    selector: 'app-game-board',
    templateUrl: './game-board.component.html',
    styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit, AfterViewInit {
    @ViewChild('board', {static: true})
    private canvas: ElementRef<HTMLCanvasElement>;
    @ViewChild('canvasHolder', {static: true})
    private canvasHolder: ElementRef<HTMLDivElement>;

    private players: Player[] = [];
    private ctx: CanvasRenderingContext2D;
    private keyPlayerActionMap: Record<string, { player: Player; action: INPUT_ACTION }> = {};
    private time = {last: GameHelper.timestamp(), intervalMs: GAME_LOOP_INTERVAL};
    private gameRunning = false;
    private gamePaused = false;

    constructor() {
    }

    ngOnInit() {
        this.initBoard();
    }

    ngAfterViewInit() {
        this.handleResize();
        GameHelper.initStartPosistions();
    }

    private initBoard() {
        this.ctx = this.canvas.nativeElement.getContext('2d');
        this.ctx.scale(30, 30);
    }

    startGame() {
        //  TODO verify player amount and readiness
        if (this.gamePaused) {
            this.gamePaused = false;
        }
        this.gameRunning = true;
        this.redraw();
    }

    redraw() {
        if (!this.gameRunning) {
            return;
        }
        const alivePlayers = this.players.filter(p => p.alive);
        if (this.checkWinner(alivePlayers)) {
            return;
        }
        const now = GameHelper.timestamp();
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
        const {point, angle} = GameHelper.START_POSITIONS[this.players.length];
        const color = GameHelper.COLORS[this.players.length];
        const player = new Player(this.ctx, `Player ${(1 + this.players.length).toString()}`, point, angle, color);
        const keyActions = DEFAULT_KEYMAP[this.players.length];

        keyActions.forEach(keyActionMap => this.keyPlayerActionMap[keyActionMap.code] = {
            player,
            action: keyActionMap.action
        });
        this.players.push(player);
    }

    resetGame() {
        this.ctx.clearRect(0, 0, GameHelper.GAME_BOARD_WIDTH, GameHelper.GAME_BOARD_HEIGHT);
        const nrOfPlayers = this.players.length;
        this.players = [];
        for (let i = 0; i < nrOfPlayers; i++) {
            this.addPlayer();
        }
        CollisionDetector.reset();
        this.gameRunning = false;
    }

    handleResize() {
        // GameHelper.GAME_BOARD_HEIGHT = this.canvasHolder.nativeElement.clientHeight;
        // GameHelper.GAME_BOARD_WIDTH = this.canvasHolder.nativeElement.clientWidth;
        this.ctx.canvas.width = GameHelper.GAME_BOARD_WIDTH;
        this.ctx.canvas.height = GameHelper.GAME_BOARD_HEIGHT;
    }

    pauseGame() {
        this.gameRunning = false;
        this.gamePaused = true;
    }
}
