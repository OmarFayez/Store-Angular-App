import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [ProductsRoutingModule.Component],
  imports: [CommonModule, ProductsRoutingModule],
})
export class ProductsFeatureModule {}
