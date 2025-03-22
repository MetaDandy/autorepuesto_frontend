import { useAuth } from "@/hooks/use_auth";
import useAppStore from "@/lib/store";
import { useMutation } from "@tanstack/react-query";
import { DepositSchema } from "./deposit.schema";
import { API_ROUTES } from "@/lib/api.routes";
import { Deposit } from "./deposit";
import { FetchHelper } from "@/lib/fetch_helper";

export const useDepositMutations = (refetch?: () => void) => {
  const { setLockScreen, showToast, setSheet } = useAppStore();
  const { token } = useAuth();

  const mutationCreate = useMutation<Deposit, Error, DepositSchema>({
    mutationFn: async (data) => {
      setSheet(false);
      setLockScreen({
        isVisible: true,
        type: 'loading',
        content: 'Creando el depósito'
      });

      return await FetchHelper<Deposit>({
        token: token ?? '',
        baseUrl: API_ROUTES.DEPOSIT,
        data,
      });
    },
    onSuccess: () => {
      refetch?.();
      setSheet(false);
      setLockScreen(false);
      showToast("Depósito creado", "Se creó correctamente", "success");
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

  const mutationUpdate = useMutation<Deposit, Error, { id: string; data: DepositSchema }>({
    mutationFn: async ({ id, data }) => {
      setSheet(false);

      setLockScreen({
        isVisible: true,
        type: "loading",
        content: 'Actualizando el depósito'
      })

      return await FetchHelper<Deposit>({
        baseUrl: `${API_ROUTES.DEPOSIT}/${id}`,
        token: token ?? '',
        data: data,
        method: 'PATCH',
      });
    },
    onSuccess: () => {
      refetch?.();
      setLockScreen(false);
      setSheet(false);
      showToast("Depósito actualizado", "Se actualizó correctamente.", "success");
    },
    onError: (error) => {
      setLockScreen(false);
      showToast("Error", error.message, "error");
    }
  });

  const mutationHardDelete = useMutation<string, Error, string>({
    mutationFn: async (id: string) => {
      setLockScreen({
        isVisible: true,
        type: "loading",
        content: 'Eliminando permanentemente el depósito'
      });

      return await FetchHelper<Deposit>({
        token: token ?? '',
        baseUrl: `${API_ROUTES.DEPOSIT_HARD_DELETE}/${id}`,
        method: "DELETE"
      });
    },
    onSuccess: () => {
      refetch?.();

      setLockScreen(false);

      showToast(
        'El depósito fue permanentemente eliminado.',
        'El depósito fue eliminado permanentemente exitosamente.',
        "success"
      );
    },
    onError: (error) => {
      setLockScreen(false);

      showToast(
        'El producto no se pudo eliminar permanentemente.',
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
        content: "Eliminando el depósito",
      });

      return await FetchHelper<Deposit>({
        token: token ?? '',
        baseUrl: `${API_ROUTES.DEPOSIT_SOFT_DELETE}/${id}`,
        method: "DELETE"
      })
    },
    onSuccess: () => {
      refetch?.();

      setLockScreen(false);

      showToast(
        'Depósito eliminado.',
        'El depósito fue eliminada exitosamente.',
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
        content: "Restuarando el depósito",
      });

      return await FetchHelper<Deposit>({
        token: token ?? '',
        baseUrl: `${API_ROUTES.DEPOSIT_RESTORE}/${id}`,
        method: "POST"
      });
    },
    onSuccess: () => {
      refetch?.();

      setLockScreen(false);

      showToast(
        'El depósito restaurada.',
        'El depósito fue restaurada exitosamente.',
        "success"
      );
    },
    onError: (error) => {
      setLockScreen(false);

      showToast(
        'El depósito no se pudo restaurar.',
        `Error: ${error.message}`,
        "error"
      );
    },
  });

  return {
    mutationCreate,
    mutationUpdate,
    mutationHardDelete,
    mutationRestore,
    mutationSoftDelete
  };
}