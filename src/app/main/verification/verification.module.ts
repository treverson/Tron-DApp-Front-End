import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '../../../@fuse/shared.module';
import { VerificationComponent } from './verification.component';
import { MatButtonModule, MatProgressSpinnerModule } from '@angular/material';
import { User } from '../../model/user.model';
import { UserService } from '../../service/user.service';

const routes = [
  {
      path     : 'verification',
      component: VerificationComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    TranslateModule,

    MatButtonModule,
    MatProgressSpinnerModule,
    
    FuseSharedModule
  ],
  declarations: [
    VerificationComponent
  ],
  exports     : [
    VerificationComponent
  ],
  providers: [
    User,
    UserService
  ]
})
export class VerificationModule { }
