import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProductsComponent } from './user-products/user-products.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {
    path: 'products',
    component: UserProductsComponent,
    title: 'Products',
  },
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    title: 'Admin Dashboard',
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {
  public static Component = [UserProductsComponent, AdminDashboardComponent];
}
