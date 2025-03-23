'use client';

import { useParams } from 'next/navigation';
import { useFindOneQuery } from '@/hooks/use_find_one_query';
import { QUERY_KEY } from '@/lib/query_key';
import { API_ROUTES } from '@/lib/api.routes';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { IncomeNote } from '../../utils/income_note';
import { ImageWithTitle } from '@/components/image_with_title';

export default function ViewIncomeNotePage() {
  const { id } = useParams() as { id: string };

  const { data, isLoading } = useFindOneQuery<IncomeNote>(
    QUERY_KEY.INCOME_NOTE,
    API_ROUTES.INCOME_NOTE,
    id
  );

  console.log(data);

  if (isLoading) return <p className="p-6">Cargando nota de ingreso...</p>;

  if (!data) return <p className="p-6">No se encontró la nota de ingreso.</p>;

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Detalle de Nota de Ingreso</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <p><strong>Código:</strong> {data.code}</p>
        <p><strong>Descripción:</strong> {data.description}</p>
        <p><strong>Total:</strong> ${data.total}</p>
        <p><strong>Fecha:</strong> {new Date(data.createdAt ?? '').toLocaleString()}</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Detalles del Ingreso</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead>Característica</TableHead>
              <TableHead>Depósito</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Stock antes</TableHead>
              <TableHead>Stock después</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.income_detail?.map((detail, i) => {
              const dp = detail.deposit_product;
              return (
                <TableRow key={i}>
                  <TableCell className="flex items-center gap-2">
                    {dp?.product?.image && (
                      <ImageWithTitle
                        title={dp.product.name}
                        src={dp.product.image}
                      />
                    )}
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">{dp?.product?.code}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {dp?.characteristic?.color && (
                        <div
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: dp.characteristic.color }}
                        />
                      )}
                      <div className="text-sm">
                        {dp?.characteristic?.code}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{dp?.deposit?.place}</TableCell>
                  <TableCell>{detail.quantity}</TableCell>
                  <TableCell>${detail.total}</TableCell>
                  <TableCell>{detail.stock_before}</TableCell>
                  <TableCell>{detail.stock_after}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
