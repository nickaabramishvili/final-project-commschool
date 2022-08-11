import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { customerPasswordStrength } from '../validators/user-password.validator';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  addCustomerForm: FormGroup;
  constructor(public authService: AuthService) {
    this.addCustomerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        customerPasswordStrength(),
      ]),
    });
  }

  signInUser() {
    if (this.addCustomerForm.valid) {
      this.authService.signIn(
        this.addCustomerForm.value.email,
        this.addCustomerForm.value.password
      );
    }
  }
}
