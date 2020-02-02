import {Component, Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class GameLogic {
    static timestamp() {
        return window.performance.now();
    }


}