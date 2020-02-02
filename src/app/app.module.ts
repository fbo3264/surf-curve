import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {GameBoardComponent} from './game-board/game-board.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {GameLogic} from "./shared/GameLogic";

@NgModule({
    declarations: [
        AppComponent,
        GameBoardComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot() // ToastrModule added
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
