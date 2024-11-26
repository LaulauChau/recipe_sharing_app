import { Component, Input } from "@angular/core";

import { LogoComponent } from "@/presentation/shared/components/logo/logo.component";

@Component({
  selector: "app-auth-layout",
  standalone: true,
  imports: [LogoComponent],
  templateUrl: "./auth-layout.component.html",
})
export class AuthLayoutComponent {
  @Input({ required: true }) title!: string;
}
