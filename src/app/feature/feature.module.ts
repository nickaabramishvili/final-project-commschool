import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReviewComponent } from './review/review.component';
import { ListComponent } from './list/list.component';
import { FeatureComponent } from './feature.component';
import { RouterModule } from '@angular/router';
import { routes } from './feature.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ArrayToStringPipe } from '../shared/pipes/array-to-string.pipe';
import { ScrollListenerDirective } from '../shared/directives/scroll-listener.directive';

@NgModule({
  declarations: [
    DashboardComponent,
    ReviewComponent,
    ListComponent,
    FeatureComponent,
    ArrayToStringPipe,
    ScrollListenerDirective,
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule,

    RouterModule.forChild(routes),
  ],
})
export class FeatureModule {}
