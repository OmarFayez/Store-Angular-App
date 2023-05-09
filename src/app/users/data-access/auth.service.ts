import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../utils/user.model';
import { LoginResult } from '../utils/login-form.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  private userList: User[] = [
    {
      userName: 'admin',
      password: 'admin',
      role: 'admin',
    },
    {
      userName: 'user',
      password: 'user',
      role: 'user',
    },
  ];
  public login(user: {
    userName: string;
    password: string;
  }): Observable<LoginResult> {
    const loginUser = this.userList.find(
      (existUser) =>
        existUser.userName === user.userName &&
        existUser.userName === user.userName
    );
    if (loginUser)
      return of({
        status: 200,
        message: 'Login Success',
        role: loginUser.role,
      });
    else
      return of({
        status: 403,
        message: 'Check user name or password..',
        role: '',
      });
  }
}
