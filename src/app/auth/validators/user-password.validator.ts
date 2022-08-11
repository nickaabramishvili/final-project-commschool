import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function customerPasswordStrength(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumber = /[0-9]+/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumber;

    return !passwordValid ? { isPasswordInValid: true } : null;
  };
}
