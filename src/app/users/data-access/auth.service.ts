import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../utils/user.model';
import { LoginResult } from '../utils/login-form.model';
import { Router } from '@angular/router';
import { EncodeDecodeService } from 'src/app/core/services/encode-decode.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private encodeDecodeService: EncodeDecodeService
  ) {
    this.getCurrentUser();
  }

  private _currentUser: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  public currentUser = this._currentUser.asObservable();
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
    if (loginUser) {
      this._currentUser.next(loginUser);
      const encodedCurrentUser = this.encodeDecodeService.toBinary(
        JSON.stringify(loginUser)
      );
      localStorage.setItem('currentUser', encodedCurrentUser);

      localStorage.setItem('userRole', loginUser.role);
      return of({
        status: 200,
        message: 'Login Success',
        role: loginUser.role,
      });
    } else
      return of({
        status: 403,
        message: 'Check user name or password..',
        role: '',
      });
  }

  public logOut() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    this._currentUser.next(null);
    this.router.navigate(['/']);
  }

  private getCurrentUser = (): void => {
    const encodedCurrentUser = localStorage.getItem('currentUser') as string;
    if (encodedCurrentUser) {
      const decodedCurrentUser =
        this.encodeDecodeService.fromBinary(encodedCurrentUser);
      const currentUser = JSON.parse(decodedCurrentUser);
      this._currentUser.next(currentUser);
    } else this._currentUser.next(null);
  };
}
