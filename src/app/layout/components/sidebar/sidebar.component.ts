import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: [ './sidebar.component.scss' ]
})
export class SidebarComponent implements OnInit {
	isActive: boolean = false;
	collapsed: boolean = false;

	@Output() collapsedEvent = new EventEmitter<boolean>();

	constructor() {}

	eventCalled() {
		this.isActive = !this.isActive;
	}

	ngOnInit() {}

	toggleCollapsed() {
		this.collapsed = !this.collapsed;
		this.collapsedEvent.emit(this.collapsed);
	}
}
