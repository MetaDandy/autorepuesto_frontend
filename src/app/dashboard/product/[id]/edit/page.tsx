'use client';

import { useFindOneQuery } from "@/hooks/use_find_one_query";
import { useParams } from "next/navigation";
import { Product } from "../../utils/product";
import { QUERY_KEY } from "@/lib/query_key";
import { API_ROUTES } from "@/lib/api.routes";
import { ProductForm } from "../../components/product.form";

export default function EditProductPage() {
  const { id } = useParams() as { id: string };

  const { data, isLoading } = useFindOneQuery<Product>(
    QUERY_KEY.PRODUCT,
    API_ROUTES.PRODUCT,
    id
  );
  
  if (isLoading) return <p className="p-6">Cargando datos...</p>;

  return (
      <ProductForm product={data} />
  );
}