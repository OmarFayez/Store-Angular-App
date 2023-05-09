import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginUiComponent } from './login-ui/login-ui.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginUiComponent],
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
  exports: [LoginUiComponent],
})
export class UsersUiModule {}
