import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  sideBarOpen = true;

  constructor() { }

  ngOnInit() { }


  sideBarToggler($event: any) {
    this.sideBarOpen = !this.sideBarOpen;
  }

}