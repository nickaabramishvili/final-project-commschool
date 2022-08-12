import { Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { FeatureComponent } from './feature.component';
import { ListComponent } from './list/list.component';
import { ReviewComponent } from './review/review.component';

export const routes: Routes = [
  {
    path: '',
    component: FeatureComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      { path: 'details/:id', component: DetailsComponent },
      { path: 'list', component: ListComponent },
      { path: 'add', component: ReviewComponent },
    ],
  },
];
