import { Component }                    from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule }                 from '@angular/common';
import { Router }                       from '@angular/router';
import { AuthService }                  from '../auth.service';
import { MatCardModule }                from '@angular/material/card';
import { MatFormFieldModule }           from '@angular/material/form-field';
import { MatInputModule }               from '@angular/material/input';
import { MatButtonModule }              from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { email, password } = this.form.value;
    this.auth.login(email!, password!).subscribe({
      next: ()    => this.router.navigate(['/dashboard']),
      error: err  => this.error = err.error?.message || 'Error de login'
    });
  }
}
