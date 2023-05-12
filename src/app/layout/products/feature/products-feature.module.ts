import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsUiModule } from '../ui/products-ui.module';

@NgModule({
  declarations: [ProductsRoutingModule.Component],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    ProductsUiModule,
  ],
})
export class ProductsFeatureModule {}
