import { NgModule } from '@angular/core';
import { User } from '../../model/user.model';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { UserService } from '../../service/user.service';
import { ResetPasswordComponent } from './reset-password.component';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatProgressSpinnerModule } from '@angular/material';

const routes = [
  {
      path     : 'reset-password',
      component: ResetPasswordComponent
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
    ResetPasswordComponent
  ],
  exports     : [
    ResetPasswordComponent
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
export class ResetPasswordModule { }
