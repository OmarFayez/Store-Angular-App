import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { layoutGuard } from 'src/app/core/guards/layout.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'login',
    canActivate: [layoutGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersFeatureRoutingModule {
  public static Component = [LoginComponent];
}
