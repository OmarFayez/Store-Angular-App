import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MaterialModule } from './material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from './ui/button/button.component';

// const THIRD_MODULES: any[] = [MaterialModule];
@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule, MaterialModule, NgOptimizedImage, TranslateModule],
  exports: [MaterialModule, NgOptimizedImage, TranslateModule, ButtonComponent],
})
export class SharedModule {}
