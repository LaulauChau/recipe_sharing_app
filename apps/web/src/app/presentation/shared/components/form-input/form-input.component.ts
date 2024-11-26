import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
} from "@angular/forms";

import { FormFieldConfig } from "./form-input.type";

@Component({
  selector: "app-form-input",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./form-input.component.html",
})
export class FormInputComponent {
  @Input({ required: true }) config!: FormFieldConfig;
  @Input({ required: true }) control!: FormControl;
  @Input() form?: FormGroup;

  showPassword = false;

  get isPassword(): boolean {
    return (
      this.config.type === "password" || this.config.type === "confirmPassword"
    );
  }

  ngOnInit() {
    if (this.config.type === "confirmPassword" && this.form) {
      this.setupPasswordValidation();
    }
  }

  private setupPasswordValidation() {
    if (!this.config.passwordMatchField || !this.form) return;

    this.control.setValidators([
      ...(this.control.validator ? [this.control.validator] : []),
      (control: AbstractControl): ValidationErrors | null => {
        // biome-ignore lint/style/noNonNullAssertion: false positive
        const password = this.form?.get(this.config.passwordMatchField!)?.value;
        return control.value === password ? null : { passwordMismatch: true };
      },
    ]);
  }
}
