import { ProductType } from "../../product_type/utils/product_type";

export type Product = {
  id?: string;
  name: string;
  description: string;
  code: string;
  price: string;
  technology: string;
  product_type: ProductType;
  image: any;
  product_image?: any[];
}