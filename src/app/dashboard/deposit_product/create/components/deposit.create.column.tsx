import { Deposit } from "@/app/dashboard/deposit/utils/deposit";
import { ColumnDef } from "@tanstack/react-table";

export const DepositCreateColumn: ColumnDef<Deposit>[] = [
    {
      header: 'Código',
      accessorKey: 'code'
    },
    {
      accessorKey: "place",
      header: 'Lugar'
    },
  ]