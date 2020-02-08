import {Component, Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class GameHelper {
    static timestamp() {
        return window.performance.now();
    }

    static GAME_BOARD_WIDTH: number;
    static GAME_BOARD_HEIGHT: number;
    static START_POSITIONS: any[] = [];

    static initStartPosistions() {
        const startPosX = GameHelper.GAME_BOARD_WIDTH / 2;
        const startPosY = GameHelper.GAME_BOARD_HEIGHT / 2;
        GameHelper.START_POSITIONS = [{point: {x: startPosX, y: startPosY}, angle: 90},
            {point: {x: startPosX, y: startPosY}, angle: 0},
            {point: {x: startPosX, y: startPosY}, angle: 180},
            {point: {x: startPosX, y: startPosY}, angle: 270}]
    }

    static COLORS = ["red", "green", "black", "blue"];

}