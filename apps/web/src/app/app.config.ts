import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { provideRouter } from "@angular/router";

import { environment } from "@/config/environment";
import { routes } from "./app.routes";
import { AuthService } from "./application/services/auth-service.interface";
import { LoginUseCase } from "./application/use-cases/auth/login.use-case";
import { LogoutUseCase } from "./application/use-cases/auth/logout.use-case";
import { RegisterUseCase } from "./application/use-cases/auth/register.use-case";
import { CreateRecipeUseCase } from "./application/use-cases/recipe/create-recipe.use-case";
import { DeleteRecipeUseCase } from "./application/use-cases/recipe/delete-recipe.use-case";
import { FindRecipeUseCase } from "./application/use-cases/recipe/find-recipe.use-case";
import { FindRecipesUseCase } from "./application/use-cases/recipe/find-recipes.use-case";
import { UpdateRecipeUseCase } from "./application/use-cases/recipe/update-recipe.use-case";
import { RecipeRepository } from "./domain/repositories/recipe-repository.interface";
import { FirestoreRecipeRepositoryImpl } from "./infrastructure/persistence/repositories/firestore-recipe.repository";
import { FirebaseAuthServiceImpl } from "./infrastructure/services/firebase-auth.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    {
      provide: AuthService,
      useClass: FirebaseAuthServiceImpl,
    },
    LoginUseCase,
    LogoutUseCase,
    RegisterUseCase,
    {
      provide: RecipeRepository,
      useClass: FirestoreRecipeRepositoryImpl,
    },
    CreateRecipeUseCase,
    DeleteRecipeUseCase,
    FindRecipeUseCase,
    FindRecipesUseCase,
    UpdateRecipeUseCase,
  ],
};
