import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { debounceTime } from "rxjs";

@Component({
  selector: "app-search-bar",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./search-bar.component.html",
})
export class SearchBarComponent {
  searchControl = new FormControl("");
  @Output() search = new EventEmitter<string>();

  constructor() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => this.search.emit(value ?? ""));
  }
}
