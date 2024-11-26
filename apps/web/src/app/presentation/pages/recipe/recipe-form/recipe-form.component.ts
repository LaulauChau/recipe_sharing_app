import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { CreateRecipeUseCase } from "@/application/use-cases/recipe/create-recipe.use-case";
import { FindRecipeUseCase } from "@/application/use-cases/recipe/find-recipe.use-case";
import { UpdateRecipeUseCase } from "@/application/use-cases/recipe/update-recipe.use-case";

@Component({
  selector: "app-recipe-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./recipe-form.component.html",
})
export class RecipeFormComponent implements OnInit {
  recipeForm: FormGroup;
  loading = false;
  error = "";
  isEdit = false;
  recipeId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private createRecipeUseCase: CreateRecipeUseCase,
    private updateRecipeUseCase: UpdateRecipeUseCase,
    private findRecipeUseCase: FindRecipeUseCase,
  ) {
    this.recipeForm = this.createForm();
  }

  async ngOnInit() {
    this.recipeId = this.route.snapshot.paramMap.get("id");
    if (this.recipeId) {
      this.isEdit = true;
      await this.loadRecipe();
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      ingredients: this.fb.array([], Validators.required),
      steps: this.fb.array([], Validators.required),
      time: this.fb.group({
        preparation: [0, [Validators.required, Validators.min(0)]],
        cooking: [0, [Validators.required, Validators.min(0)]],
      }),
    });
  }

  get ingredients() {
    return this.recipeForm.get("ingredients") as FormArray;
  }

  get steps() {
    return this.recipeForm.get("steps") as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.fb.control("", Validators.required));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  addStep() {
    this.steps.push(this.fb.control("", Validators.required));
  }

  removeStep(index: number) {
    this.steps.removeAt(index);
  }

  private async loadRecipe() {
    try {
      const recipe = await this.findRecipeUseCase.execute({
        id: this.recipeId ?? "",
      });
      if (!recipe) {
        throw new Error("Recipe not found");
      }

      this.recipeForm.patchValue({
        name: recipe.name,
        time: recipe.time,
      });

      for (const ingredient of recipe.ingredients) {
        this.ingredients.push(this.fb.control(ingredient, Validators.required));
      }

      for (const step of recipe.steps) {
        this.steps.push(this.fb.control(step, Validators.required));
      }
    } catch (error) {
      this.error =
        error instanceof Error ? error.message : "Error loading recipe";
    }
  }

  async onSubmit() {
    if (this.recipeForm.invalid) return;

    this.loading = true;
    this.error = "";

    try {
      if (this.isEdit) {
        await this.updateRecipeUseCase.execute({
          id: this.recipeId ?? "",
          data: this.recipeForm.value,
        });
      } else {
        await this.createRecipeUseCase.execute(this.recipeForm.value);
      }
      await this.router.navigate(["/recipe"]);
    } catch (error) {
      this.error =
        error instanceof Error ? error.message : "Error saving recipe";
    } finally {
      this.loading = false;
    }
  }

  goBack() {
    this.router.navigate(["/recipe"]);
  }
}
