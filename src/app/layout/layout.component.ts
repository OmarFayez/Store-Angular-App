import { Component } from '@angular/core';
import { AuthService } from '../users/data-access/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  constructor(private authService: AuthService) {}
  public logOut() {
    this.authService.logOut();
  }
}
