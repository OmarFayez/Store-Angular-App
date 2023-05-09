import { FormControl } from '@angular/forms';

export interface LoginForm {
  userName: FormControl<string | null>;
  password: FormControl<string | null>;
}

export interface LoginFormValue {
  userName: string;
  password: string;
}

export interface LoginResult {
  status: number;
  message: string;
  role: string;
}
