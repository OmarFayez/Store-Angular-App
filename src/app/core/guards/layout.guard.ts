import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/users/data-access/auth.service';

export const layoutGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser.pipe(
    map((user) => {
      const isAuthenticated: boolean = !!user;
      if (isAuthenticated) {
        router.navigate(['/', 'store']);
        return false;
      } else {
        return true;
      }
    })
  );
};
