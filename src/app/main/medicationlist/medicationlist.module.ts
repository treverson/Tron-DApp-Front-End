import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'app/guard/auth.guard';
import { Document } from '../../model/document.model';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DocumentService } from '../../service/document.service';
import { MedicationlistComponent } from './medicationlist.component';
import { MatButtonModule, MatIconModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';

const routes = [
  {
    path: 'medicationlist',
    component: MedicationlistComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),

    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatProgressSpinnerModule,

    TranslateModule,

    FuseSharedModule
  ],
  declarations: [
    MedicationlistComponent
  ],
  exports: [
    MedicationlistComponent
  ],
  providers: [
    Document,
    DocumentService,
  ]
})

export class MedicationlistModule { }
