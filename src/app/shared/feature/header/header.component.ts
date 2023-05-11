import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { LanguageComponent } from '../../ui/language/language.component';
import { AuthService } from 'src/app/users/data-access/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/users/utils/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SharedModule, LanguageComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private readonly authService: AuthService) {}
  public readonly user$: Observable<User | null> = this.authService.currentUser;

  public logOut() {
    this.authService.logOut();
  }
}
