import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MaterialModule } from './material.module';
import { TranslateModule } from '@ngx-translate/core';

// const THIRD_MODULES: any[] = [MaterialModule];
@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule, NgOptimizedImage, TranslateModule],
  exports: [MaterialModule, NgOptimizedImage, TranslateModule],
})
export class SharedModule {}
