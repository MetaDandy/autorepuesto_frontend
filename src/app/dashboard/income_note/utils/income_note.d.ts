import { DepositProduct } from "../../deposit_product/utils/deposit_product";

type IncomeDetailDto = {
  deposit_product_id: string;
  deposit_product?: DepositProduct;
  quantity: number;
  total: number;
  stock_before?: number;
  stock_after?: number;
}

export type IncomeNote = {
  id?: string;
  description: string;
  details: IncomeDetailDto[];
  income_detail?: IncomeDetailDto[];
  code?: string;
  total?: number;
  user?: any;
  createdAt?: Date;
}