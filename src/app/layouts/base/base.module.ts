import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatCardModule, MatDividerModule, MatPaginatorModule, MatSidenavModule, MatTableModule} from '@angular/material';
import {BaseComponent} from "./base.component";
import {HomeComponent} from "../home/home.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    declarations: [
        BaseComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatSidenavModule,
        MatDividerModule,
        FlexLayoutModule,
        MatCardModule,
        MatPaginatorModule,
        MatTableModule,
        SharedModule
    ],
    providers: [
    ]
})
export class BaseModule {
}