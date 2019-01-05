import { NgModule } from '@angular/core';
import { User } from '../../model/user.model';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { UserService } from '../../service/user.service';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatProgressSpinnerModule } from '@angular/material';

const routes = [
    {
        path     : 'login',
        component: LoginComponent
    }
];

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        RecaptchaModule.forRoot(),
        
        ReactiveFormsModule,

        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatProgressSpinnerModule,

        TranslateModule,

        FuseSharedModule
    ],
    exports     : [
        LoginComponent
    ],
    providers: [
        User,
        UserService,
        {
            provide: RECAPTCHA_SETTINGS,
            useValue: { siteKey: '6LeFoXYUAAAAAHWf0V9wDZGs_oagYUxuA7y1BLKm' } as RecaptchaSettings 
        }
    ]
})

export class LoginModule
{
}
