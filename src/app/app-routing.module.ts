import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./layouts/home/home.component";
import {GameBoardComponent} from "./game-board/game-board.component";
import {BaseComponent} from "./layouts/base/base.component";


@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot(AppRoutingModule.routes)
    ]
})
export class AppRoutingModule {
    private static routes: Routes = [{
        path: '',
        component: BaseComponent,
        children: [{
            path: '',
            component: HomeComponent
        }, {
            path: 'game',
            component: GameBoardComponent
        }]
    }
    ]
}
