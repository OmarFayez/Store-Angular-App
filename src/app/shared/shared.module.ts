import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MaterialModule } from './material.module';
// const THIRD_MODULES: any[] = [MaterialModule];
@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule, NgOptimizedImage],
  exports: [MaterialModule, NgOptimizedImage],
})
export class SharedModule {}
