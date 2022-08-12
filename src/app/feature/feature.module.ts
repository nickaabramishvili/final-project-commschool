import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReviewComponent } from './review/review.component';
import { ListComponent } from './list/list.component';
import { FeatureComponent } from './feature.component';
import { RouterModule } from '@angular/router';
import { routes } from './feature.routing.module';
@NgModule({
  declarations: [
    DashboardComponent,
    ReviewComponent,
    ListComponent,
    FeatureComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FeatureModule {}
