import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {AppRoutingModule} from "./app-routing.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {BaseComponent} from "./layouts/base/base.component";
import {BaseModule} from "./layouts/base/base.module";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BaseModule,
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot(),
        MatToolbarModule,
        MatDividerModule,
        MatListModule,
        MatIconModule,
        MatSidenavModule,
        // ToastrModule added
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
