import { Component } from '@angular/core';
import { LoginFormValue, LoginResult } from '../../utils/login-form.model';
import { AuthService } from '../../data-access/auth.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private snackBarService: SnackBarService,
    private router: Router
  ) {}

  private destroyed$: Subject<void> = new Subject();

  public submitLoginForm(loginFormValue: LoginFormValue) {
    this.authService
      .login(loginFormValue)
      .pipe(
        takeUntil(this.destroyed$),
        tap((result: LoginResult) => {
          console.log(result);
          this.snackBarService.snackbar(
            result?.message,
            result?.status === 200 ? 'success' : 'error'
          );

          if (result?.status === 200)
            this.router.navigate([
              result?.role === 'admin' ? '/store/dashboard' : '/store/products',
            ]);
        })
      )
      .subscribe();
  }
}
