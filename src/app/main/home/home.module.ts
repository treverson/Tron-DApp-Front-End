import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { HomeComponent } from './home.component';
import { Contact } from '../../model/contact.model';
import { UserService } from '../../service/user.service';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { MatButtonModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';


const routes = [
    {
        path     : 'home',
        component: HomeComponent
    },
    {
        path: "home/:id",
        component: HomeComponent 
    }
];

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,

        TranslateModule,

        FuseSharedModule,

        RecaptchaModule.forRoot(),
    ],
    exports     : [
        HomeComponent
    ],
    providers: [ 
        Contact,
        UserService,
        {
            provide: RECAPTCHA_SETTINGS,
            useValue: { siteKey: '6LeFoXYUAAAAAHWf0V9wDZGs_oagYUxuA7y1BLKm' } as RecaptchaSettings 
        }
    ]
})

export class HomeModule
{
}
