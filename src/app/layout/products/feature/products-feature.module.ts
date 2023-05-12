import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsUiModule } from '../ui/products-ui.module';
import { DialogComponent } from 'src/app/shared/ui/dialog/dialog-ui.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImagePickerComponent } from 'src/app/shared/ui/image-picker/image-picker.component';

@NgModule({
  declarations: [ProductsRoutingModule.Component],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    ProductsUiModule,
    DialogComponent,
    ImagePickerComponent,
  ],
})
export class ProductsFeatureModule {}
