import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: "recipe-sharing-app-6ec13",
        appId: "1:688436745851:web:2377ed1e0d4251eb40f4de",
        storageBucket: "recipe-sharing-app-6ec13.firebasestorage.app",
        apiKey: "AIzaSyAohTofetaMb4fk0YIVVTXP7AxQT0LKDao",
        authDomain: "recipe-sharing-app-6ec13.firebaseapp.com",
        messagingSenderId: "688436745851",
      }),
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
