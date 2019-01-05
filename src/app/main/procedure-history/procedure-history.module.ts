import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'app/guard/auth.guard';
import { Document } from '../../model/document.model';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { DocumentService } from '../../service/document.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProcedureHistoryComponent } from './procedure-history.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MatButtonModule, MatIconModule, MatTooltipModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';

const routes = [
  {
    path: 'procedure-history',
    component: ProcedureHistoryComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatProgressSpinnerModule,

    TranslateModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,

    FuseSharedModule
  ],
  declarations: [
    ProcedureHistoryComponent
  ],
  exports: [
    ProcedureHistoryComponent
  ],
  providers: [
    Document,
    DocumentService,
  ]
})

export class ProcedureHistoryModule { }
