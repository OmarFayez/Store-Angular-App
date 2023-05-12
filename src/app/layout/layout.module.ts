import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, LayoutRoutingModule, MatProgressSpinnerModule],
})
export class LayoutModule {}
