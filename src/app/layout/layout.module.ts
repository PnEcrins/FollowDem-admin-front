import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
	imports: [ CommonModule, LayoutRoutingModule, TranslateModule, ReactiveFormsModule, NgbModule ],
	declarations: [ LayoutComponent, SidebarComponent, HeaderComponent ],
	
})
export class LayoutModule {}
