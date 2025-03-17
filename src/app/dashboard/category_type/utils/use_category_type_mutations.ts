import { useAuth } from "@/hooks/use_auth";
import useAppStore from "@/lib/store";
import { CategoryType } from "./category_type";
import { useMutation } from "@tanstack/react-query";
import { CategoryTypeSchema } from "./category_type.schema";
import { FetchHelper } from "@/lib/fetch_helper";
import { API_ROUTES } from "@/lib/api.routes";
import { useRouter } from "next/navigation";

export const useCategoryTypeMutations = (refetch?: () => void) => {
  const { setLockScreen, showToast } = useAppStore();
  const router = useRouter();
  const { token } = useAuth();

  const mutationCreate = useMutation<CategoryType, Error, CategoryTypeSchema>({
    mutationFn: async (data) => await FetchHelper<CategoryType>({
      token: token ?? '',
      baseUrl: API_ROUTES.CATEGORY_TYPE,
      data,
    }),
    onSuccess: () => {
      setLockScreen(false);

      router.push('/dashboard/category_type');

      showToast(
        'Tipo de categoría creada.',
        'El tipo de categoría fue creada exitosamente.',
        "success"
      );
    },
    onError: (error) => {
      showToast(
        'El tipo de categoría no se pudo crear.',
        `Error: ${error.message}`,
        "error"
      );
    },
  });

  const mutationUpdate = useMutation<CategoryType, Error, { id: string; data: CategoryTypeSchema }>({
    mutationFn: async ({ id, data }) => {
      return await FetchHelper<CategoryType>({
        baseUrl: `${API_ROUTES.CATEGORY_TYPE}/${id}`,
        token: token ?? '',
        data: data,
        method: 'PATCH',
      });
    },
    onSuccess: () => {
      setLockScreen(false);

      router.push('/dashboard/category_type');

      showToast(
        'Categoría Actualizada.',
        'La categoría fue actualizada exitosamente.',
        "success"
      );
    },
    onError: (error) => {
      setLockScreen(false);

      showToast(
        'La categoría no se pudo actualizar.',
        `Error: ${error.message}`,
        "error"
      );
    },
  });

  const mutationHardDelete = useMutation<string, Error, string>({
    mutationFn: async (id: string) => await FetchHelper<CategoryType>({
      token: token ?? '',
      baseUrl: `${API_ROUTES.CATEGORY_TYPE_HARD_DELETE}/${id}`,
      method: "DELETE"
    }),
    onSuccess: () => {
      refetch?.();

      setLockScreen(false);

      showToast(
        'Tipo de categoría permanentemente eliminado.',
        'La categoría fue eliminada permanentemente exitosamente.',
        "success"
      );
    },
    onError: (error) => {
      setLockScreen(false);

      showToast(
        'El tipo de categoría no se pudo eliminar permanentemente.',
        `Error: ${error.message}`,
        "error"
      );

    },
  });

  const mutationSoftDelete = useMutation<string, Error, string>({
    mutationFn: async (id: string) => await FetchHelper<CategoryType>({
      token: token ?? '',
      baseUrl: `${API_ROUTES.CATEGORY_TYPE_SOFT_DELETE}/${id}`,
      method: "DELETE"
    }),
    onSuccess: () => {
      refetch?.();

      setLockScreen(false);

      showToast(
        'Tipo de categoría eliminada.',
        'La categoría fue eliminada exitosamente.',
        "success"
      );
    },
    onError: (error) => {
      setLockScreen(false);

      showToast(
        'El tipo de categoría no se pudo eliminar.',
        `Error: ${error.message}`,
        "error"
      );
    },
  });

  const handleSoftDelete = async (id: string) => {
    setLockScreen({
      isVisible: true,
      type: "loading",
      content: "Eliminando el tipo de categoría",
    });

    mutationSoftDelete.mutate(id);
  };

  const mutationRestore = useMutation<string, Error, string>({
    mutationFn: async (id: string) => await FetchHelper<CategoryType>({
      token: token ?? '',
      baseUrl: `${API_ROUTES.CATEGORY_TYPE_RESTORE}/${id}`,
      method: "POST"
    }),
    onSuccess: () => {
      refetch?.();

      setLockScreen(false);

      showToast(
        'Categoría restaurada.',
        'La categoría fue restaurada exitosamente.',
        "success"
      );
    },
    onError: (error) => {
      setLockScreen(false);

      showToast(
        'La categoría no se pudo restaurar.',
        `Error: ${error.message}`,
        "error"
      );
    },
  });

  const handleRestore = async (id: string) => {
    setLockScreen({
      isVisible: true,
      type: "loading",
      content: "Restuarando el tipo de categoría",
    });

    mutationRestore.mutate(id);
  };

  return {
    mutationCreate,
    mutationUpdate,
    mutationHardDelete,
    handleSoftDelete,
    handleRestore
  }
}