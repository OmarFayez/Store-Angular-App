import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersFeatureRoutingModule } from './users-feature-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersUiModule } from '../ui/users-ui.module';

@NgModule({
  declarations: [UsersFeatureRoutingModule.Component],
  imports: [
    CommonModule,
    UsersFeatureRoutingModule,
    UsersUiModule,
    SharedModule,
  ],
})
export class UsersFeatureModule {}
