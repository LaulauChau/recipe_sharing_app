import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { provideRouter } from "@angular/router";

import { environment } from "@/config/environment";
import { routes } from "./app.routes";
import { AuthService } from "./application/services/auth-service.interface";
import { LoginUseCase } from "./application/use-cases/auth/login.use-case";
import { RegisterUseCase } from "./application/use-cases/auth/register.use-case";
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
    RegisterUseCase,
  ],
};
