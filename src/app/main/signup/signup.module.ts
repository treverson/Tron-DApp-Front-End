import { NgModule } from '@angular/core';
import { User } from '../../model/user.model';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { UserService } from '../../service/user.service';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule} from '@angular/material';

const routes = [
    {
        path     : 'signup',
        component: SignupComponent
    }
];

@NgModule({
    declarations: [
        SignupComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        ReactiveFormsModule,

        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,

        TranslateModule,

        FuseSharedModule,

        RecaptchaModule.forRoot(),
    ],
    exports     : [
        SignupComponent
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

export class SignupModule
{
}
