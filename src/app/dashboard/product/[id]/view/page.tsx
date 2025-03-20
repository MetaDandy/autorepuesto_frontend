'use client';

import { useFindOneQuery } from "@/hooks/use_find_one_query";
import { useParams } from "next/navigation";
import { Product } from "../../utils/product";
import { QUERY_KEY } from "@/lib/query_key";
import { API_ROUTES } from "@/lib/api.routes";
import { useProductMutations } from "../../utils/use_product_mutations";
import { Button } from "@/components/ui/button";
import { ProductImageUploader } from "../../components/product_image_uploader";

export default function ViewProductPage() {
  const { id } = useParams() as { id: string };
  const { data, isLoading, refetch } = useFindOneQuery<Product>(
    QUERY_KEY.PRODUCT,
    API_ROUTES.PRODUCT,
    id
  );

  const { mutationUploadImages, mutationDeleteMultipleImages, mutationDeleteOneImage } = useProductMutations(refetch);

  if (isLoading) return <p className="p-6">Cargando datos...</p>;

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Detalle del Producto</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <p><strong>Nombre:</strong> {data?.name}</p>
        <p><strong>Descripción:</strong> {data?.description}</p>
        <p><strong>Código:</strong> {data?.code}</p>
        <p><strong>Precio:</strong> ${data?.price}</p>
        <p><strong>Tecnología:</strong> {data?.technology}</p>
        <p><strong>Tipo:</strong> {data?.product_type?.name}</p>
      </div>

      {data?.image && (
        <div className="space-y-2">
          <p className="font-medium">Imagen Principal:</p>
          <div className="relative inline-block max-w-xs rounded-md overflow-hidden border">
            <img
              src={data.image}
              alt="Imagen principal"
              className="w-full h-auto object-contain"
            />
            <Button
              type="button"
              size="sm"
              variant="destructive"
              className="absolute top-1 right-1 text-xs px-2 py-0.5 shadow-sm"
              onClick={() => data.id && mutationDeleteOneImage.mutate(data.id)}
            >
              X
            </Button>
          </div>
        </div>
      )}


      <div className="space-y-2">
        <p className="font-medium">Imágenes adicionales:</p>
        <div className="flex flex-wrap gap-4">
          {data?.product_image?.map((img) => (
            <div key={img.id} className="relative">
              <img src={img.url} alt="extra" className="w-32 h-32 object-cover rounded border" />
              <Button
                size="sm"
                variant="destructive"
                className="absolute top-1 right-1 text-xs"
                onClick={() => mutationDeleteMultipleImages.mutate(img.id)}
              >
                X
              </Button>
            </div>
          ))}
        </div>
      </div>

      {data?.product_image && data?.product_image?.length < 4 &&
        <div className="space-y-2">
          <p className="font-medium">Subir nuevas imágenes:</p>
          <ProductImageUploader
            currentCount={data?.product_image?.length || 0}
            onUpload={(images) => mutationUploadImages.mutate({ id, images })}
          />
        </div>
      }
    </div>
  );
}
