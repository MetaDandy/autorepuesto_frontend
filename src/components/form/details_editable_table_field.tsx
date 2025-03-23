'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UseFormRegister, FieldArrayWithId } from 'react-hook-form';

interface EditableField {
  label: string;
  fieldName: string;
  type?: 'number' | 'text';
  className?: string;
}

interface DetailsEditableTableProps<TDetail> {
  fields: FieldArrayWithId<any, 'details', 'id'>[]; // mantén esto genérico y estable
  register: UseFormRegister<any>;
  remove: (index: number) => void;
  editableFields?: EditableField[];
  renderExtraColumns?: (item: TDetail, index: number) => React.ReactNode;
  renderRowLabel?: (item: TDetail, index: number) => React.ReactNode;
}

export function DetailsEditableTable<TDetail>({
  fields,
  register,
  remove,
  editableFields = [
    { label: 'Cantidad', fieldName: 'quantity', type: 'number' },
    { label: 'Total', fieldName: 'total', type: 'number' },
  ],
  renderExtraColumns,
  renderRowLabel,
}: DetailsEditableTableProps<TDetail>) {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Detalles</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Elemento</TableHead>
            {editableFields.map((field) => (
              <TableHead key={field.fieldName}>{field.label}</TableHead>
            ))}
            {renderExtraColumns && <TableHead>Extras</TableHead>}
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>
                {renderRowLabel ? renderRowLabel(item as TDetail, index) : (item as any).deposit_product_id}
              </TableCell>
              {editableFields.map((field) => (
                <TableCell key={field.fieldName}>
                  <Input
                    type={field.type || 'text'}
                    {...register(`details.${index}.${field.fieldName}` as any, {
                      valueAsNumber: field.type === 'number',
                    })}
                    className={field.className || 'w-24'}
                  />
                </TableCell>
              ))}
              {renderExtraColumns && (
                <TableCell>{renderExtraColumns(item as TDetail, index)}</TableCell>
              )}
              <TableCell>
                <Button type="button" variant="destructive" onClick={() => remove(index)}>
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

