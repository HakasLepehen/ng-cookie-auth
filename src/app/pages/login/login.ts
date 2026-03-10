import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  authForm: FormGroup;
  loading = false;
  submitted = false;
  message = '';
  messageType: 'success' | 'error' | '' = '';
  action: 'login' | 'signup' = 'login';

  // Mock user database (in real app, this would be on backend)
  private users: { email: string; password: string }[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  // Getter for easy access to form fields
  get f() {
    return this.authForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.message = '';

    // Get the button that triggered the submission
    const submitter = (document.activeElement as HTMLButtonElement)?.value;
    this.action = submitter === 'signup' ? 'signup' : 'login';

    // Stop if form is invalid
    if (this.authForm.invalid) {
      return;
    }

    this.loading = true;

    // Simulate API call delay
    setTimeout(() => {
      if (this.action === 'login') {
        this.handleLogin();
      } else {
        this.handleSignup();
      }
      this.loading = false;
    }, 1000);
  }

  private handleLogin(): void {
    const { email, password } = this.authForm.value;

    // Check if user exists
    const user = this.users.find(u => u.email === email && u.password === password);

    if (user) {
      this.message = 'Login successful!';
      this.messageType = 'success';
      this.authForm.reset();
      this.submitted = false;
      console.log('User logged in:', email);
      // Here you would typically redirect or update auth state
    } else {
      this.message = 'Invalid email or password';
      this.messageType = 'error';
    }
  }

  private handleSignup(): void {
    const { email, password } = this.authForm.value;

    // Check if user already exists
    const userExists = this.users.some(u => u.email === email);

    if (userExists) {
      this.message = 'User with this email already exists';
      this.messageType = 'error';
      return;
    }

    // Add new user
    this.users.push({ email, password });
    this.message = 'Signup successful! You can now login.';
    this.messageType = 'success';
    this.authForm.reset();
    this.submitted = false;
    console.log('New user registered:', email);
  }

  // Method to clear form and messages
  resetForm(): void {
    this.authForm.reset();
    this.submitted = false;
    this.message = '';
    this.messageType = '';
  }
}
