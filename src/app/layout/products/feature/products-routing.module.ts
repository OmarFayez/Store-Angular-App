import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProductsComponent } from './user-products/user-products.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { userProductsGuard } from 'src/app/core/guards/user-products.guard';
import { adminDashboardGuard } from 'src/app/core/guards/admin-dashboard.guard';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
const userRole = localStorage.getItem('userRole');

const routes: Routes = [
  {
    path: '',
    redirectTo: userRole === 'admin' ? 'dashboard' : 'products',
    pathMatch: 'prefix',
  },
  {
    path: 'products',
    component: UserProductsComponent,
    canActivate: [userProductsGuard],
    title: 'Products',
  },
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    canActivate: [adminDashboardGuard],
    title: 'Admin Dashboard',
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {
  public static Component = [
    UserProductsComponent,
    AdminDashboardComponent,
    AddEditProductComponent,
  ];
}
