import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent, title: 'Homesapp | About' },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Homesapp | About',
  },
];
