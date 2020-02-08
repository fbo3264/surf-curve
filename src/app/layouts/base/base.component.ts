import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  sideBarOpen = false;

  constructor() { }

  ngOnInit() { }


  sideBarToggler($event: any) {
    this.sideBarOpen = !this.sideBarOpen;
  }

}