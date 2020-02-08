import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatCardModule, MatDividerModule, MatPaginatorModule, MatSidenavModule, MatTableModule} from '@angular/material';
import {BaseComponent} from "./base.component";
import {HomeComponent} from "../home/home.component";
import {SharedModule} from "../shared/shared.module";
import {GameBoardComponent} from "../../modules/game-board/game-board.component";
import {MatIconModule} from "@angular/material/icon";
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from "@angular/material/button";

@NgModule({
    declarations: [
        BaseComponent,
        HomeComponent,
        GameBoardComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        MatSidenavModule,
        MatDividerModule,
        FlexLayoutModule,
        MatCardModule,
        MatPaginatorModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule
    ],
    providers: []
})
export class BaseModule {
}