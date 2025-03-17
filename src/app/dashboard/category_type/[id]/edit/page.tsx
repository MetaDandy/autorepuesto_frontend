'use client';

import { useParams } from 'next/navigation';
import { CategoryTypeForm } from '../../components/category_type.form';
import { useFindOneQuery } from '@/hooks/use_find_one_query';
import { CategoryType } from '../../utils/category_type';
import { QUERY_KEY } from '@/lib/query_key';
import { API_ROUTES } from '@/lib/api.routes';

export default function EditCategoryTypePage() {
  const { id } = useParams() as { id: string };

  const { data, isLoading } = useFindOneQuery<CategoryType>(
    QUERY_KEY.CATEGORY_TYPE,
    API_ROUTES.CATEGORY_TYPE,
    id
  );

  if (isLoading) return <p className="p-6">Cargando datos...</p>;

  return (
      <CategoryTypeForm category_type={data} />
  );
}
