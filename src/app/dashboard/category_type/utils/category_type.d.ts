import { Category } from "../../category/utils/category";

export type CategoryType = {
  id?: string;
  name: string;
  description: string;
  category: Category;
}