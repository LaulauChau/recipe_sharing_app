import { Injectable } from "@angular/core";
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "@angular/fire/auth";
import { Router } from "@angular/router";
import { type Observable } from "rxjs/internal/Observable";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(
    private auth: Auth,
    private router: Router,
  ) {
    this.user$ = authState(auth) as Observable<User | null>;

    this.user$.subscribe((user) => {
      if (user) {
        void this.router.navigate(["/protected"]);
        return;
      }

      void this.router.navigate(["/login"]);
    });
  }

  async signIn(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(
        this.auth,
        email,
        password,
      );

      if (result.user) {
        void this.router.navigate(["/protected"]);
      }

      return result;
    } catch (error: unknown) {
      console.error(error);

      throw error;
    }
  }

  async signUp(email: string, password: string) {
    try {
      const result = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password,
      );

      if (result.user) {
        void this.router.navigate(["/protected"]);
      }

      return result;
    } catch (error: unknown) {
      console.error(error);

      throw error;
    }
  }

  async signOut() {
    try {
      await signOut(this.auth);

      void this.router.navigate(["/login"]);
    } catch (error: unknown) {
      console.error(error);

      throw error;
    }
  }
}
