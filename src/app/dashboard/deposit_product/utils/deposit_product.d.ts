import { Characteristics } from "../../characteristics/utils/characteristics";
import { Deposit } from "../../deposit/utils/deposit";
import { Product } from "../../product/utils/product";

export type DepositProduct = {
  id?: string;
  stock?: number;
  product_id: string;
  deposit_id: string;
  characteristics_id: string;
  product?: Product;
  deposit?: Deposit;
  characteristic?: Characteristics;
}