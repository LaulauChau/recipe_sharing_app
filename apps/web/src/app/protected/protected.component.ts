import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-protected-page",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./protected.component.html",
})
export class ProtectedComponent implements OnInit {
  userEmail: string | null = null;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.user$.subscribe((user) => {
      this.userEmail = user?.email ?? null;
    });
  }

  async logout() {
    try {
      await this.auth.signOut();
    } catch (error) {
      console.error(error);
    }
  }
}
