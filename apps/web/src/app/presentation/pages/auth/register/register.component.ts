import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";

import { registerDto } from "@/application/dtos/auth.dto";
import { RegisterUseCase } from "@/application/use-cases/auth/register.use-case";
import { FormButtonComponent } from "@/presentation/shared/components/form-button/form-button.component";
import { FormInputComponent } from "@/presentation/shared/components/form-input/form-input.component";
import type { FormFieldConfig } from "@/presentation/shared/components/form-input/form-input.type";
import { AuthLayoutComponent } from "@/presentation/shared/layouts/auth-layout/auth-layout.component";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    AuthLayoutComponent,
    FormButtonComponent,
    FormInputComponent,
  ],
  templateUrl: "./register.component.html",
})
export class RegisterComponent implements OnInit {
  readonly registerFields: FormFieldConfig[] = [
    {
      id: "name",
      label: "Name",
      type: "text",
      minLength: 3,
      maxLength: 255,
    },
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
      maxLength: 255,
      pattern:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,255}$/,
    },
    {
      id: "confirmPassword",
      label: "Confirm Password",
      type: "confirmPassword",
      passwordMatchField: "password",
    },
  ];

  errorMessage = "";
  showPassword = false;
  registerForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly registerUseCase: RegisterUseCase,
    private readonly router: Router,
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
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
      confirmPassword: [
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
    if (!this.registerForm.valid) {
      return;
    }

    if (
      this.registerForm.value.password !==
      this.registerForm.value.confirmPassword
    ) {
      this.errorMessage = "Passwords do not match";
      return;
    }

    try {
      await this.registerUseCase.execute(
        registerDto.parse(this.registerForm.value),
      );
      await this.router.navigate(["/recipe"]);
    } catch (error: unknown) {
      console.error(error);

      this.errorMessage =
        error instanceof Error ? error.message : "Invalid credentials";
    } finally {
      this.registerForm.markAllAsTouched();
    }
  }
}
