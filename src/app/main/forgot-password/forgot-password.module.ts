import { NgModule } from '@angular/core';
import { User } from '../../model/user.model';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { UserService } from '../../service/user.service';
import { ForgotPasswordComponent } from './forgot-password.component';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatProgressSpinnerModule } from '@angular/material';


const routes = [
  {
      path     : 'forgot-password',
      component: ForgotPasswordComponent
  }
];

@NgModule({
  imports: [
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
  declarations: [
    ForgotPasswordComponent
  ],
  exports     : [
    ForgotPasswordComponent
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
export class ForgotPasswordModule { }
