import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [HeaderComponent, SidebarComponent],
  exports: [
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule
  ]
})
export class SharedModule { }
