import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [CommonModule, LoginRoutingModule,
        FormsModule,                               // <========== Add this line!
        ReactiveFormsModule,
        TranslateModule,],
    declarations: [LoginComponent]
})
export class LoginModule {}
