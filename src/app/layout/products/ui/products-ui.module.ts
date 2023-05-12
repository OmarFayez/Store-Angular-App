import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardUiComponent } from './admin-dashboard-ui/admin-dashboard-ui.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { StarsComponent } from 'src/app/shared/ui/stars/stars.component';

@NgModule({
  declarations: [AdminDashboardUiComponent, ProductListItemComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, StarsComponent],
  exports: [AdminDashboardUiComponent, ProductListItemComponent],
})
export class ProductsUiModule {}
