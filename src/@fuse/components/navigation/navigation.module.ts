import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseNavigationComponent } from './navigation.component';
import { FuseNavVerticalItemComponent } from './vertical/item/item.component';
import { FuseNavVerticalGroupComponent } from './vertical/group/group.component';
import { FuseNavHorizontalItemComponent } from './horizontal/item/item.component';
import { FuseNavVerticalCollapsableComponent } from './vertical/collapsable/collapsable.component';
import { FuseNavHorizontalCollapsableComponent } from './horizontal/collapsable/collapsable.component';
import { MatIconModule, MatRippleModule, MatButtonModule, MatMenuModule, MatToolbarModule } from '@angular/material';

@NgModule({
    imports     : [
        CommonModule,
        RouterModule,

        MatButtonModule,
        MatIconModule,
        MatRippleModule,
        MatMenuModule,
        MatToolbarModule,

        TranslateModule.forChild()
    ],
    exports     : [
        FuseNavigationComponent
    ],
    declarations: [
        FuseNavigationComponent,
        FuseNavVerticalGroupComponent,
        FuseNavVerticalItemComponent,
        FuseNavVerticalCollapsableComponent,
        FuseNavHorizontalItemComponent,
        FuseNavHorizontalCollapsableComponent
    ]
})
export class FuseNavigationModule
{
}
