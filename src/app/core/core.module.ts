import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxProgressBarModule } from './modules/ngx-progressbar.module';
import { NgxTranslateModule } from './modules/ngx-translate.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxProgressBarModule,
    NgxTranslateModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      easeTime: 700,
      positionClass: 'toast-bottom-left',
    }),
  ],
  exports: [HttpClientModule, NgxProgressBarModule, NgxTranslateModule],
})
export class CoreModule {}
