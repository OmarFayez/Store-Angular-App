import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/users/data-access/auth.service';

export const adminDashboardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser.pipe(
    map((user) => {
      const isAdmin: boolean = !!user && user?.role === 'admin';
      if (!isAdmin) router.navigateByUrl('/access-denied');
      return isAdmin;
    })
  );
};
