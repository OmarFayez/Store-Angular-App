import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MaterialModule } from './material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from './ui/button/button.component';
import { NoDataComponent } from './ui/no-data/no-data.component';

// const THIRD_MODULES: any[] = [MaterialModule];
@NgModule({
  declarations: [ButtonComponent, NoDataComponent],
  imports: [CommonModule, MaterialModule, NgOptimizedImage, TranslateModule],
  exports: [
    MaterialModule,
    NgOptimizedImage,
    TranslateModule,
    ButtonComponent,
    NoDataComponent,
  ],
})
export class SharedModule {}
