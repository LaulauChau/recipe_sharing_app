import { Injectable } from "@angular/core";
import {
  CollectionReference,
  Firestore,
  QueryDocumentSnapshot,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "@angular/fire/firestore";

import type { Recipe } from "@/domain/entities/recipe.entity";
import { RecipeRepository } from "@/domain/repositories/recipe-repository.interface";

@Injectable({
  providedIn: "root",
})
export class FirestoreRecipeRepositoryImpl implements RecipeRepository {
  private static readonly COLLECTION_NAME = "recipes";
  private readonly collectionReference: CollectionReference;

  constructor(private readonly firestore: Firestore) {
    this.collectionReference = collection(
      this.firestore,
      FirestoreRecipeRepositoryImpl.COLLECTION_NAME,
    );
  }

  async create(data: Omit<Recipe, "id" | "createdAt">): Promise<Recipe> {
    try {
      const documentReference = await addDoc(this.collectionReference, {
        ...data,
        createdAt: serverTimestamp(),
      });

      const newRecipe = await this.findById(documentReference.id);

      if (!newRecipe) {
        throw new Error("Error creating recipe");
      }

      return newRecipe;
    } catch (error: unknown) {
      console.error(error);

      throw new Error(
        error instanceof Error ? error.message : "An error occurred",
      );
    }
  }

  async findAll(): Promise<Recipe[]> {
    try {
      const q = query(this.collectionReference, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((document) =>
        this.mapDocumentToRecipe(document),
      );
    } catch (error: unknown) {
      console.error(error);

      throw new Error(
        error instanceof Error ? error.message : "An error occurred",
      );
    }
  }

  async findById(id: string): Promise<Recipe | null> {
    try {
      const documentReference = doc(this.collectionReference, id);
      const documentSnapshot = await getDoc(documentReference);

      if (!documentSnapshot.exists()) {
        return null;
      }

      return this.mapDocumentToRecipe(documentSnapshot);
    } catch (error: unknown) {
      console.error(error);

      throw new Error(
        error instanceof Error ? error.message : "An error occurred",
      );
    }
  }

  async update(params: {
    id: string;
    data: Partial<Omit<Recipe, "id" | "createdAt" | "author">>;
  }): Promise<Recipe> {
    try {
      const documentReference = doc(this.collectionReference, params.id);

      await updateDoc(documentReference, params.data);

      const updatedDocumentSnapshot = await getDoc(documentReference);

      if (!updatedDocumentSnapshot.exists()) {
        throw new Error("Error updating recipe");
      }

      return this.mapDocumentToRecipe(updatedDocumentSnapshot);
    } catch (error: unknown) {
      console.error(error);

      throw new Error(
        error instanceof Error ? error.message : "An error occurred",
      );
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const documentReference = doc(this.collectionReference, id);

      await deleteDoc(documentReference);

      return true;
    } catch (error: unknown) {
      console.error(error);

      throw new Error(
        error instanceof Error ? error.message : "An error occurred",
      );
    }
  }

  private mapDocumentToRecipe(document: QueryDocumentSnapshot): Recipe {
    const data = document.data();

    return {
      id: document.id,
      name: data["name"],
      ingredients: data["ingredients"],
      steps: data["steps"],
      difficulty: data["difficulty"],
      time: {
        preparation: data["time"].preparation,
        cooking: data["time"].cooking,
      },
      author: {
        id: data["author"].id,
        name: data["author"].name,
      },
      createdAt: (data["createdAt"] as Timestamp).toDate(),
    };
  }
}
