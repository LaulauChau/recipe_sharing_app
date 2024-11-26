import { Injectable } from "@angular/core";
import {
  Auth,
  type User as FirebaseUser,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "@angular/fire/auth";
import { Observable, map } from "rxjs";

import { AuthService } from "@/application/services/auth-service.interface";
import type { User } from "@/domain/entities/user.entity";

@Injectable({
  providedIn: "root",
})
export class FirebaseAuthServiceImpl implements AuthService {
  user$: Observable<User | null>;

  constructor(private readonly auth: Auth) {
    this.user$ = authState(this.auth).pipe(
      map((user: FirebaseUser) =>
        user
          ? {
              id: user.uid,
              name: user.displayName ?? "",
              email: user.email ?? "",
            }
          : null,
      ),
    );
  }

  getCurrentUser(): User | null {
    if (!this.auth.currentUser) {
      return null;
    }

    return {
      id: this.auth.currentUser?.uid ?? "",
      name: this.auth.currentUser?.displayName ?? "",
      email: this.auth.currentUser?.email ?? "",
    };
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const result = await signInWithEmailAndPassword(
        this.auth,
        email,
        password,
      );

      return {
        id: result.user.uid,
        email: result.user?.email ?? "",
        name: result.user?.displayName ?? "",
      };
    } catch (error: unknown) {
      console.error(error);

      throw new Error(
        error instanceof Error ? error.message : "An error occurred",
      );
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error: unknown) {
      console.error(error);

      throw new Error(
        error instanceof Error ? error.message : "An error occurred",
      );
    }
  }

  async register(name: string, email: string, password: string): Promise<User> {
    try {
      const result = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password,
      );

      if (result.user) {
        await updateProfile(result.user, {
          displayName: name,
        });
      }

      return {
        id: result.user.uid,
        email: result.user.email ?? "",
        name: result.user.displayName ?? "",
      };
    } catch (error: unknown) {
      console.error(error);

      throw new Error(
        error instanceof Error ? error.message : "An error occurred",
      );
    }
  }
}
