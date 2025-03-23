import { useAuth } from "@/hooks/use_auth";
import useAppStore from "@/lib/store";
import { useMutation } from "@tanstack/react-query";
import { DepositProduct } from "./deposit_product";
import { DepositProductSchema } from "./deposit.schema";
import { FetchHelper } from "@/lib/fetch_helper";
import { API_ROUTES } from "@/lib/api.routes";
import { useRouter } from "next/navigation";

export const useDepositProductMutations = (refetch?: () => void) => {
  const { setLockScreen, showToast } = useAppStore();
  const { token } = useAuth();
  const router = useRouter();

  const mutationCreate = useMutation<DepositProduct, Error, DepositProductSchema>({
    mutationFn: async (data) => {
      setLockScreen({
        isVisible: true,
        type: 'loading',
        content: 'Creando el depósito-producto'
      });

      return await FetchHelper<DepositProduct>({
        token: token ?? '',
        baseUrl: API_ROUTES.DEPOSIT_PRODUCT,
        data,
      });
    },
    onSuccess: () => {
      setLockScreen(false);
      router.push("/dashboard/deposit_product");
      showToast("Depósito-producto creado", "Se creó correctamente", "success");
    },
    onError: (error) => {
      setLockScreen(false);
      showToast(
        'El depósito no se pudo crear.',
        `Error: ${error.message}`,
        "error"
      );
    },
  });

  const mutationSoftDelete = useMutation<string, Error, string>({
    mutationFn: async (id: string) => {
      setLockScreen({
        isVisible: true,
        type: "loading",
        content: "Eliminando el depósito-producto",
      });

      return await FetchHelper<DepositProduct>({
        token: token ?? '',
        baseUrl: `${API_ROUTES.DEPOSIT_PRODUCT_SOFT_DELETE}/${id}`,
        method: "DELETE"
      })
    },
    onSuccess: () => {
      refetch?.();

      setLockScreen(false);

      showToast(
        'Depósito-producto eliminado.',
        'El depósito-producto fue eliminada exitosamente.',
        "success"
      );
    },
    onError: (error) => {
      setLockScreen(false);

      showToast(
        'El depósito no se pudo eliminar.',
        `Error: ${error.message}`,
        "error"
      );
    },
  });

  const mutationRestore = useMutation<string, Error, string>({
    mutationFn: async (id: string) => {
      setLockScreen({
        isVisible: true,
        type: "loading",
        content: "Restuarando el depósito-producto",
      });

      return await FetchHelper<DepositProduct>({
        token: token ?? '',
        baseUrl: `${API_ROUTES.DEPOSIT_PRODUCT_RESTORE}/${id}`,
        method: "POST"
      });
    },
    onSuccess: () => {
      refetch?.();

      setLockScreen(false);

      showToast(
        'El depósito-producto restaurada.',
        'El depósito-producto fue restaurada exitosamente.',
        "success"
      );
    },
    onError: (error) => {
      setLockScreen(false);

      showToast(
        'El depósito-producto no se pudo restaurar.',
        `Error: ${error.message}`,
        "error"
      );
    },
  });

  return {
    mutationCreate,
    mutationRestore,
    mutationSoftDelete
  };
}