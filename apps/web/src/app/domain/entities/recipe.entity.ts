export type RecipeDifficulty = "easy" | "medium" | "hard";

export type Recipe = Readonly<{
  id: string;
  name: string;
  ingredients: string[];
  steps: string[];
  difficulty: RecipeDifficulty;
  time: {
    preparation: number;
    cooking: number;
  };
  author: {
    id: string;
    name: string;
  };
  createdAt: Date;
}>;
