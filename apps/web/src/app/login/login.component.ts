import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  email = "";
  password = "";
  error = "";

  constructor(private auth: AuthService) {}

  async onSubmit() {
    try {
      await this.auth.signIn(this.email, this.password);
    } catch (error) {
      console.error(error);

      this.error =
        error instanceof Error ? error.message : "An error occurred.";
    }
  }
}
