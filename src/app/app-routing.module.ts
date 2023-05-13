import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./users/feature/users-feature.module').then(
        (m) => m.UsersFeatureModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: 'access-denied',
    title: 'Store | Unauthorized',
    loadComponent: () =>
      import('./core/pages/access-denied/access-denied.component').then(
        (mod) => mod.AccessDeniedComponent
      ),
  },
  {
    path: 'not-found',
    title: 'Store | Not Found',
    loadComponent: () =>
      import('./core/pages/not-found/not-found.component').then(
        (mod) => mod.NotFoundComponent
      ),
  },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
