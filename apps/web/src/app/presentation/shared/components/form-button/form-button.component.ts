import { Component, Input } from "@angular/core";

@Component({
  selector: "app-form-button",
  standalone: true,
  templateUrl: "./form-button.component.html",
})
export class FormButtonComponent {
  @Input() disabled = false;
}
