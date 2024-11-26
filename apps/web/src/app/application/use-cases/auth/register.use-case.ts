import { Injectable } from "@angular/core";

import type { RegisterDto } from "@/application/dtos/auth.dto";
import { AuthService } from "@/application/services/auth-service.interface";
import type { User } from "@/domain/entities/user.entity";

@Injectable({
  providedIn: "root",
})
export class RegisterUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute({
    name,
    email,
    password,
  }: Omit<RegisterDto, "confirmPassword">): Promise<User> {
    return this.authService.register(name, email, password);
  }
}
