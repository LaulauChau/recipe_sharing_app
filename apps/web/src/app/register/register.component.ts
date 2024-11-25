import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";

import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./register.component.html",
})
export class RegisterComponent {
  email = "";
  password = "";
  showPassword = false;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  async onSubmit() {
    try {
      await this.auth.signUp(this.email, this.password);
      void this.router.navigate(["/protected"]);
    } catch (error) {
      console.error(error);
    }
  }
}
