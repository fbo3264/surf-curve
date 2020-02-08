import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    @Output() toggleSidebarEmitter: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    toggleSideBar() {
        this.toggleSidebarEmitter.emit();
        setTimeout(() => {
            window.dispatchEvent(
                new Event('resize')
            );
        }, 300);
    }
}
