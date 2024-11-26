export type FormFieldType = "text" | "email" | "password" | "confirmPassword";

export interface FormFieldConfig {
  id: string;
  label: string;
  type: FormFieldType;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  passwordMatchField?: string;
}
