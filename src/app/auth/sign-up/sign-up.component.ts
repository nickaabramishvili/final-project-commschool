import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { customerPasswordStrength } from '../validators/user-password.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpUserForm: FormGroup;
  isSubmited: boolean = false;
  constructor(public authService: AuthService) {
    this.signUpUserForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        customerPasswordStrength(),
      ]),
    });
  }

  signUpUser() {
    this.isSubmited = true;
    if (this.signUpUserForm.valid) {
      this.authService.signUp(
        this.signUpUserForm.value.email,
        this.signUpUserForm.value.password
      );
    }
    // ar gadadioda pirvel klikze da es ro mdavmate titqos firebase azzrze movida ratomgac
    console.log(
      this.authService.signUp(
        this.signUpUserForm.value.email,
        this.signUpUserForm.value.password
      )
    );
  }
  ngOnInit(): void {}
}
