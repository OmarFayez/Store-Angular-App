import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/users/data-access/auth.service';

export const userProductsGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log('RouteConfig', route.routeConfig?.path);

  return authService.currentUser.pipe(
    map((user) => {
      const isUser: boolean = !!user && user?.role === 'user';

      if (!isUser) router.navigateByUrl('/access-denied');

      return isUser;

      // debugger;
      // const isAuthenticated: boolean = !!user;
      // if (isAuthenticated && user?.role === 'user') {
      //   return true;
      // } else {
      //   router.navigate(['/']);
      //   return false;
      // }
    })
  );
};
