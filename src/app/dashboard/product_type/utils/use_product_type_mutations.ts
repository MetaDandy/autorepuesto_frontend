import { useAuth } from "@/hooks/use_auth";
import useAppStore from "@/lib/store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ProductType } from "./product_type";
import { ProductTypeSchema } from "./product_type.schema";
import { FetchHelper } from "@/lib/fetch_helper";
import { API_ROUTES } from "@/lib/api.routes";

export const useProductTypeMutations = (refetch?: ()=> void) => {
  const { setLockScreen, showToast } = useAppStore();
  const router = useRouter();
  const { token } = useAuth();

  const mutationCreate = useMutation<ProductType, Error, ProductTypeSchema>({
    mutationFn: async (data) => await FetchHelper<ProductType>({
      token: token ?? '',
      baseUrl: API_ROUTES.PRODUCT_TYPE,
      data,
    }),
    onSuccess: () => {
      setLockScreen(false);

      router.push('/dashboard/product_type');

      showToast(
        'Tipo de producto creada.',
        'El tipo de producto fue creada exitosamente.',
        "success"
      );
    },
    onError: (error) => {
      showToast(
        'El tipo de producto no se pudo crear.',
        `Error: ${error.message}`,
        "error"
      );
    },
  });

  const mutationUpdate = useMutation<ProductType, Error, { id: string; data: ProductTypeSchema }>({
    mutationFn: async ({ id, data }) => {
      return await FetchHelper<ProductType>({
        baseUrl: `${API_ROUTES.PRODUCT_TYPE}/${id}`,
        token: token ?? '',
        data: data,
        method: 'PATCH',
      });
    },
    onSuccess: () => {
      setLockScreen(false);

      router.push('/dashboard/product_type');

      showToast(
        'Producto Actualizado.',
        'El tipo de producto fue actualizada exitosamente.',
        "success"
      );
    },
    onError: (error) => {
      setLockScreen(false);

      showToast(
        'El tipo de producto no se pudo actualizar.',
        `Error: ${error.message}`,
        "error"
      );
    },
  });

  const mutationHardDelete = useMutation<string, Error, string>({
    mutationFn: async (id: string) => await FetchHelper<ProductType>({
      token: token ?? '',
      baseUrl: `${API_ROUTES.PRODUCT_TYPE_HARD_DELETE}/${id}`,
      method: "DELETE"
    }),
    onSuccess: () => {
      refetch?.();

      setLockScreen(false);

      showToast(
        'Tipo de producto permanentemente eliminado.',
        'El tipo producto fue eliminada permanentemente exitosamente.',
        "success"
      );
    },
    onError: (error) => {
      setLockScreen(false);

      showToast(
        'El tipo de producto no se pudo eliminar permanentemente.',
        `Error: ${error.message}`,
        "error"
      );

    },
  });

  const mutationSoftDelete = useMutation<string, Error, string>({
    mutationFn: async (id: string) => await FetchHelper<ProductType>({
      token: token ?? '',
      baseUrl: `${API_ROUTES.PRODUCT_TYPE_SOFT_DELETE}/${id}`,
      method: "DELETE"
    }),
    onSuccess: () => {
      refetch?.();

      setLockScreen(false);

      showToast(
        'Tipo de producto eliminado.',
        'El tipo de producto fue eliminada exitosamente.',
        "success"
      );
    },
    onError: (error) => {
      setLockScreen(false);

      showToast(
        'El tipo de producto no se pudo eliminar.',
        `Error: ${error.message}`,
        "error"
      );
    },
  });

  const handleSoftDelete = async (id: string) => {
    setLockScreen({
      isVisible: true,
      type: "loading",
      content: "Eliminando el tipo de producto",
    });

    mutationSoftDelete.mutate(id);
  };

  const mutationRestore = useMutation<string, Error, string>({
    mutationFn: async (id: string) => await FetchHelper<ProductType>({
      token: token ?? '',
      baseUrl: `${API_ROUTES.PRODUCT_TYPE_RESTORE}/${id}`,
      method: "POST"
    }),
    onSuccess: () => {
      refetch?.();

      setLockScreen(false);

      showToast(
        'El tipo de producto restaurada.',
        'El tipo de producto fue restaurada exitosamente.',
        "success"
      );
    },
    onError: (error) => {
      setLockScreen(false);

      showToast(
        'El tipo de producto no se pudo restaurar.',
        `Error: ${error.message}`,
        "error"
      );
    },
  });

  const handleRestore = async (id: string) => {
    setLockScreen({
      isVisible: true,
      type: "loading",
      content: "Restuarando el tipo de producto",
    });

    mutationRestore.mutate(id);
  };

  return {
    mutationCreate,
    mutationUpdate,
    mutationHardDelete,
    handleSoftDelete,
    handleRestore
  };
}