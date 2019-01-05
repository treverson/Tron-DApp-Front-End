import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/guard/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { AboutComponent } from './about.component';
import { Document } from '../../model/document.model';
import { DocumentService } from '../../service/document.service';
import { MatButtonModule, MatIconModule, MatCheckboxModule, MatSelectModule, MatProgressSpinnerModule } from '@angular/material';

const routes: Routes = [
    {
        path: 'allergy',
        component: AboutComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        AboutComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatSelectModule,
        MatProgressSpinnerModule,

        ReactiveFormsModule,
        TranslateModule,

        FuseSharedModule
    ],
    exports: [
        AboutComponent
    ],
    providers: [
        Document,
        DocumentService,
    ]
})

export class AboutModule {
}
