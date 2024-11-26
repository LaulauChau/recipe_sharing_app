import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";

import { loginDto } from "@/application/dtos/auth.dto";
import { LoginUseCase } from "@/application/use-cases/auth/login.use-case";
import { FormButtonComponent } from "@/presentation/shared/components/form-button/form-button.component";
import { FormInputComponent } from "@/presentation/shared/components/form-input/form-input.component";
import type { FormFieldConfig } from "@/presentation/shared/components/form-input/form-input.type";
import { AuthLayoutComponent } from "@/presentation/shared/layouts/auth-layout/auth-layout.component";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    AuthLayoutComponent,
    FormButtonComponent,
    FormInputComponent,
  ],
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  readonly loginFields: FormFieldConfig[] = [
    {
      id: "email",
      label: "Email address",
      type: "email",
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      minLength: 12,
      pattern:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,255}$/,
    },
  ];

  errorMessage = "";
  showPassword = false;
  loginForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly loginUseCase: LoginUseCase,
    private readonly router: Router,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(255),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,255}$/,
          ),
        ],
      ],
    });
  }

  async onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    try {
      await this.loginUseCase.execute(loginDto.parse(this.loginForm.value));
      await this.router.navigate(["/recipe"]);
    } catch (error: unknown) {
      console.error(error);

      this.errorMessage =
        error instanceof Error ? error.message : "Invalid credentials";
    } finally {
      this.loginForm.markAllAsTouched();
    }
  }
}
