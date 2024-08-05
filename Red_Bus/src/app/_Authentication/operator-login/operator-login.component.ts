import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BusOperatorUserService } from '../../_service/-bus-operator-user.service';
import { OperatorUser } from '../../Modal/BusOperatorUser';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-operator-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './operator-login.component.html',
  styleUrls: ['./operator-login.component.css']
})
export class OperatorLoginComponent {
  loginForm: FormGroup;
  isSignup: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private userService:  BusOperatorUserService ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.email],
      mobile: ['', Validators.pattern(/^[0-9]{10}$/)],
      password: ['', [Validators.required, Validators.minLength(6)]]
    }, { validators: this.atLeastOneFieldValidator });

    this.loginForm.valueChanges.subscribe((formValues) => {
      console.log('Form values:', formValues);
    });
  }

  atLeastOneFieldValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.get('email')?.value;
    const mobile = control.get('mobile')?.value;

    if (!email && !mobile) {
      return { atLeastOneRequired: true };
    }
    return null;
  }

  showSignupFields() {
    this.isSignup = true;
    this.loginForm.get('email')?.setValidators([Validators.required, Validators.email]);
    this.loginForm.get('email')?.updateValueAndValidity();
  }

  showLoginFields() {
    this.isSignup = false;
    this.loginForm.get('email')?.clearValidators();
    this.loginForm.get('email')?.setValidators(Validators.email);
    this.loginForm.get('email')?.updateValueAndValidity();
  }

  onInputChange(event: any) {
    const value = event.target.value;

    if (this.isEmail(value)) {
      this.loginForm.patchValue({ email: value });
      this.loginForm.controls['mobile'].setValue(''); // Clear mobile field if email is detected
    } else if (this.isMobile(value)) {
      this.loginForm.patchValue({ mobile: value });
      this.loginForm.controls['email'].setValue(''); // Clear email field if mobile number is detected
    }
  }

  private isEmail(value: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
  }

  private isMobile(value: string): boolean {
    const mobilePattern = /^[0-9]{10}$/;
    return mobilePattern.test(value);
  }

  onLogin() {
    console.log('Login button clicked');
    console.log('Login form values:', this.loginForm.value);

    if (this.loginForm.valid) {
      Swal.fire({
        title: 'Please wait...',
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: false
      });

      const form = this.loginForm.value;
      this.userService.login(form).subscribe({
        next: (data) => {
          console.log(data);
          Swal.close(); // Close the loading Swal
          Swal.fire('Success', 'Logged in successfully', 'success');
          this.router.navigate(['/Admin']);
        },
        error: (err) => {
          console.error(err);
          Swal.close(); // Close the loading Swal
          Swal.fire({
            icon: 'error',
            title: 'Login failed',
            text: err.error.message || 'An error occurred during login'
          });
        }
      });
    }
  }

  onSignup() {
    console.log('Signup button clicked');
    console.log('Signup form values:', this.loginForm.value);

    if (!this.isSignup) {
      this.showSignupFields();
    } else {
      if (this.loginForm.valid) {
        Swal.fire({
          title: 'Please wait...',
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false
        });

        const formValues = this.loginForm.value as  OperatorUser;
        this.userService.signup(formValues).subscribe({
          next: (data) => {
            console.log(data);
            Swal.close(); // Close the loading Swal
            Swal.fire('Success', 'Signup successful', 'success');
            this.router.navigate(['/Admin']);
          },
          error: (err) => {
            console.error(err);
            Swal.close(); // Close the loading Swal
            Swal.fire({
              icon: 'error',
              title: 'Signup failed',
              text: err.error.message || 'An error occurred during signup'
            });
          }
        });
      }
    }
  }
}
