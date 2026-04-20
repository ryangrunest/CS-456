import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'trips', pathMatch: 'full' },
  { path: 'trips', loadComponent: () => import('./trip-listing/trip-listing').then(m => m.TripListing) },
  { path: 'add-trip', loadComponent: () => import('./add-trip/add-trip').then(m => m.AddTrip) },
  { path: 'edit-trip/:id', loadComponent: () => import('./edit-trip/edit-trip').then(m => m.EditTrip) },
  { path: 'login', loadComponent: () => import('./login/login').then(m => m.Login) },
];
