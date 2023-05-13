import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { HeaderComponent } from './shared/feature/header/header.component';
import { ErrorInterceptorService } from './core/services/error-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginatorIntl } from './core/modules/custom-paginator';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    HeaderComponent,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true,
    },
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
