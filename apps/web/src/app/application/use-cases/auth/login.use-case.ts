import { Injectable } from "@angular/core";

import type { LoginDto } from "@/application/dtos/auth.dto";
import { AuthService } from "@/application/services/auth-service.interface";
import type { User } from "@/domain/entities/user.entity";

@Injectable({
  providedIn: "root",
})
export class LoginUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute({ email, password }: LoginDto): Promise<User> {
    return this.authService.login(email, password);
  }
}
