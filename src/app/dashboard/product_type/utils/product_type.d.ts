import { CategoryType } from "../../category_type/utils/category_type";

export type ProductType = {
  id?: string;
  name: string;
  description: string;
  category_type: CategoryType;
}