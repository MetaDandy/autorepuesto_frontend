import { useAuth } from "@/hooks/use_auth";
import useAppStore from "@/lib/store";
import { useMutation } from "@tanstack/react-query";
import { Characteristics } from "./characteristics";
import { CharacteristicSchema } from "./characteristics.schema";
import { FetchHelper } from "@/lib/fetch_helper";
import { API_ROUTES } from "@/lib/api.routes";

export const useCharacteristicsMutations = (refetch?: () => void) => {
  const { setLockScreen, showToast, setSheet } = useAppStore();
  const { token } = useAuth();

  const mutationCreate = useMutation<Characteristics, Error, CharacteristicSchema>({
    mutationFn: async (data) => {
      setSheet(false);
      setLockScreen({
        isVisible: true,
        type: 'loading',
        content: 'Creando la característica'
      });

      return await FetchHelper<Characteristics>({
        token: token ?? '',
        baseUrl: API_ROUTES.CHARACTERISTICS,
        data,
      });
    },
    onSuccess: () => {
      refetch?.();
      setSheet(false);
      setLockScreen(false);
      showToast("Característica creada", "Se creó correctamente", "success");
    },
    onError: (error) => {
      setLockScreen(false);

      showToast(
        'La característica no se pudo crear.',
        `Error: ${error.message}`,
        "error"
      );
    },
  });

  const mutationUpdate = useMutation<Characteristics, Error, { id: string; data: CharacteristicSchema }>({
    mutationFn: async ({ id, data }) => {
      setSheet(false);

      setLockScreen({
        isVisible: true,
        type: "loading",
        content: 'Actualizando la característica'
      });

      return await FetchHelper<Characteristics>({
        baseUrl: `${API_ROUTES.CHARACTERISTICS}/${id}`,
        token: token ?? '',
        data,
        method: 'PATCH',
      });
    },
    onSuccess: () => {
      refetch?.();
      setLockScreen(false);
      setSheet(false);
      showToast("Característica actualizada", "Se actualizó correctamente.", "success");
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
        content: 'Eliminando permanentemente la característica'
      });

      return await FetchHelper<Characteristics>({
        token: token ?? '',
        baseUrl: `${API_ROUTES.CHARACTERISTICS_HARD_DELETE}/${id}`,
        method: "DELETE"
      });
    },
    onSuccess: () => {
      refetch?.();

      setLockScreen(false);

      showToast(
        'La característica fue permanentemente eliminado.',
        'La característica fue eliminado permanentemente exitosamente.',
        "success"
      );
    },
    onError: (error) => {
      setLockScreen(false);

      showToast(
        'La característica no se pudo eliminar permanentemente.',
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
        content: "Eliminando la característica",
      });

      return await FetchHelper<Characteristics>({
        token: token ?? '',
        baseUrl: `${API_ROUTES.CHARACTERISTICS_SOFT_DELETE}/${id}`,
        method: "DELETE"
      })
    },
    onSuccess: () => {
      refetch?.();

      setLockScreen(false);

      showToast(
        'La característica fue eliminada.',
        'La característica fue eliminada exitosamente.',
        "success"
      );
    },
    onError: (error) => {
      setLockScreen(false);

      showToast(
        'La característica no se pudo eliminar.',
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
        content: "Restuarando la característica",
      });

      return await FetchHelper<Characteristics>({
        token: token ?? '',
        baseUrl: `${API_ROUTES.CHARACTERISTICS_RESTORE}/${id}`,
        method: "POST"
      });
    },
    onSuccess: () => {
      refetch?.();

      setLockScreen(false);

      showToast(
        'La característica restaurada.',
        'La característica fue restaurada exitosamente.',
        "success"
      );
    },
    onError: (error) => {
      setLockScreen(false);

      showToast(
        'La característica no se pudo restaurar.',
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