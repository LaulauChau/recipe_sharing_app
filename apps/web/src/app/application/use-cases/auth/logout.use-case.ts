import { Injectable } from "@angular/core";

import { AuthService } from "@/application/services/auth-service.interface";

@Injectable({
  providedIn: "root",
})
export class LogoutUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(): Promise<void> {
    return this.authService.logout();
  }
}
