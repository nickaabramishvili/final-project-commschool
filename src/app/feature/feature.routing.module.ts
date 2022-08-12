import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeatureComponent } from './feature.component';
import { ListComponent } from './list/list.component';
import { ReviewComponent } from './review/review.component';

export const routes: Routes = [
  {
    path: '',
    component: FeatureComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'list', component: ListComponent },
      { path: 'add', component: ReviewComponent },
    ],
  },
];
