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
  signInUserForm: FormGroup;
  isSubmited: boolean = false;
  constructor(public authService: AuthService) {
    this.signInUserForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        customerPasswordStrength(),
      ]),
    });
  }

  signInUser() {
    this.isSubmited = true;
    if (this.signInUserForm.valid) {
      this.authService.signIn(
        this.signInUserForm.value.email,
        this.signInUserForm.value.password
      );
    }
    // ar gadadioda pirvel klikze da es ro mdavmate titqos firebase azzrze movida ratomgac
    console.log(
      this.authService.signIn(
        this.signInUserForm.value.email,
        this.signInUserForm.value.password
      )
    );
  }
}
