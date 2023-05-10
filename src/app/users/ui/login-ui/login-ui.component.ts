import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginForm } from '../../utils/login-form.model';

@Component({
  selector: 'app-login-ui',
  templateUrl: './login-ui.component.html',
  styleUrls: ['./login-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginUiComponent {
  @Output() onLoginForm = new EventEmitter();
  hide = true;
  loginForm: FormGroup<LoginForm> = this.formBuilder.group({
    userName: new FormControl<string | null>('', {
      validators: [Validators.required],
    }),
    password: new FormControl<string | null>('', {
      validators: Validators.required,
    }),
  });

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {}

  public onSubmit() {
    this.onLoginForm.emit(this.loginForm.value);
  }
}
