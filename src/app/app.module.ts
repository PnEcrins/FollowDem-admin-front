import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import {FormsModule} from '@angular/forms';
import {AnimalsService} from './layout/animals/animals.service';
import {DeviceService} from './layout/devices/devices.service';
import {TypeDeviceService} from './layout/type-devices/type-devices.service';
import {AttributesService} from './layout/attributes/attributes.service';
import {ToastrModule} from 'ngx-toastr';
import {NgxSpinnerModule} from 'ngx-spinner';
import {AuthService} from './shared/services/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {MyCustomInterceptor} from './shared/services/http.interceptor';

// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {

    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        NgxSpinnerModule,
        ToastrModule.forRoot(), // ToastrModule added
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        AppRoutingModule
    ],
    declarations: [AppComponent],
    providers: [
        AuthGuard,
        AnimalsService,
        DeviceService,
        AttributesService,
        TypeDeviceService,
        AuthService,
        CookieService,
        { provide: HTTP_INTERCEPTORS, useClass: MyCustomInterceptor, multi: true }
    ]
    ,
    bootstrap: [AppComponent]
})
export class AppModule {}
