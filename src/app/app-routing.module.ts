import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./layouts/home/home.component";
import {GameBoardComponent} from "./game-board/game-board.component";


@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot(AppRoutingModuleModule.routes)
    ]
})
export class AppRoutingModuleModule {
    private static routes: Routes = [{
        path: '',
        component: HomeComponent
    },
        {
            path: 'game',
            component: GameBoardComponent
        }]
}
