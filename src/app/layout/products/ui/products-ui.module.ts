import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardUiComponent } from './admin-dashboard-ui/admin-dashboard-ui.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AdminDashboardUiComponent],
  imports: [CommonModule, SharedModule],
  exports: [AdminDashboardUiComponent],
})
export class ProductsUiModule {}
