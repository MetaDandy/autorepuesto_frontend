import { useAuth } from "@/hooks/use_auth";
import { API_ROUTES } from "@/lib/api.routes";
import { FetchHelper } from "@/lib/fetch_helper";
import useAppStore from "@/lib/store";
import { useMutation } from "@tanstack/react-query"
import { Category } from "./category";
import { CategorySchema } from "./category.schema";

export const useCategoryMutations = (refetch: () => void) => {
  const { setLockScreen, setSheet, showToast } = useAppStore();
  const { token } = useAuth();

  const mutationCreate = useMutation<Category, Error, CategorySchema>({
    mutationFn: async (data) => await FetchHelper<Category>({
      token: token ?? '',
      baseUrl: API_ROUTES.CATEGORY,
      data,
    }),
    onSuccess: () => {
      refetch();

      setLockScreen(false);

      showToast(
        'Categoría creada.',
        'La categoría fue creada exitosamente.',
        "success"
      );

      setSheet(false);
    },
    onError: (error) => {
      setLockScreen(false);

      showToast(
        'La categoría no se pudo crear.',
        `Error: ${error.message}`,
        "error"
      );

      setSheet(false);
    },
  });

  const mutationUpdate = useMutation<Category, Error, { id: string; data: CategorySchema }>({
    mutationFn: async ({ id, data }: { id: string, data: Category }) => {
      return await FetchHelper<Category>({
        baseUrl: `${API_ROUTES.CATEGORY}/${id}`,
        token: token ?? '',
        data: data,
        method: 'PATCH',
      });
    },
    onSuccess: () => {
      refetch();

      setLockScreen(false);

      showToast(
        'Categoría Actualizada.',
        'La categoría fue actualizada exitosamente.',
        "success"
      );

      setSheet(false);
    },
    onError: (error) => {
      setLockScreen(false);

      showToast(
        'La categoría no se pudo actualizar.',
        `Error: ${error.message}`,
        "error"
      );

      setSheet(false);
    },
  });

  const mutationHardDelete = useMutation<string, Error, string>({
    mutationFn: async (id: string) => await FetchHelper<Category>({
      token: token ?? '',
      baseUrl: `${API_ROUTES.CATEGORY_HARD_DELETE}/${id}`,
      method: "DELETE"
    }),
    onSuccess: () => {
      refetch();

      setLockScreen(false);

      showToast(
        'Categoría permanentemente eliminada.',
        'La categoría fue eliminada permanentemente exitosamente.',
        "success"
      );
    },
    onError: (error) => {
      setLockScreen(false);

      showToast(
        'La categoría no se pudo eliminar permanentemente.',
        `Error: ${error.message}`,
        "error"
      );

      setSheet(false);
    },
  });

  const mutationSoftDelete = useMutation<string, Error, string>({
    mutationFn: async (id: string) => await FetchHelper<Category>({
      token: token ?? '',
      baseUrl: `${API_ROUTES.CATEGORY_SOFT_DELETE}/${id}`,
      method: "DELETE"
    }),
    onSuccess: () => {
      refetch();

      setLockScreen(false);

      showToast(
        'Categoría eliminada.',
        'La categoría fue eliminada exitosamente.',
        "success"
      );
    },
    onError: (error) => {
      setLockScreen(false);

      showToast(
        'La categoría no se pudo eliminar.',
        `Error: ${error.message}`,
        "error"
      );

      setSheet(false);
    },
  });

  const handleSoftDelete = async (id: string) => {
    setLockScreen({
      isVisible: true,
      type: "loading",
      content: "Eliminando la categoría",
    });

    mutationSoftDelete.mutate(id);
  };

  const mutationRestore = useMutation<string, Error, string>({
    mutationFn: async (id: string) => await FetchHelper<Category>({
      token: token ?? '',
      baseUrl: `${API_ROUTES.CATEGORY_RESTORE}/${id}`,
      method: "POST"
    }),
    onSuccess: () => {
      refetch();

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

      setSheet(false);
    },
  });

  const handleRestore = async (id: string) => {
    setLockScreen({
      isVisible: true,
      type: "loading",
      content: "Restuarando la categoría",
    });

    mutationRestore.mutate(id);
  };

  return {
    handleSoftDelete,
    handleRestore,
    mutationCreate,
    mutationUpdate,
    mutationHardDelete
  };
}