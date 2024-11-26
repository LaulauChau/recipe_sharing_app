export type Recipe = Readonly<{
  id: string;
  name: string;
  ingredients: string[];
  steps: string[];
  difficulty: "easy" | "medium" | "hard";
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
