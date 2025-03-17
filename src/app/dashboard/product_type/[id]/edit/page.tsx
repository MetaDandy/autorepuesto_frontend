'use client';

import { useFindOneQuery } from "@/hooks/use_find_one_query";
import { useParams } from "next/navigation";
import { ProductType } from "../../utils/product_type";
import { QUERY_KEY } from "@/lib/query_key";
import { API_ROUTES } from "@/lib/api.routes";
import { ProductTypeForm } from "../../components/product_type.form";

export default function EditProductTypePage() {
  const { id } = useParams() as { id: string };

  const { data, isLoading } = useFindOneQuery<ProductType>(
    QUERY_KEY.PRODUCT_TYPE,
    API_ROUTES.PRODUCT_TYPE,
    id
  );

  if (isLoading) return <p className="p-6">Cargando datos...</p>;

  return (
      <ProductTypeForm product_type={data} />
  );
}