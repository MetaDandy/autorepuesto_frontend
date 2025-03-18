import { useAuth } from "@/hooks/use_auth";
import useAppStore from "@/lib/store";
import { useRouter } from "next/navigation";
import { Product } from "./product";
import { useMutation } from "@tanstack/react-query";
import { API_ROUTES } from "@/lib/api.routes";
import { FetchHelper } from "@/lib/fetch_helper";
import { ProductSchema } from "./product.schema";

export const useProductMutations = (refetch?: () => void) => {
  const { setLockScreen, showToast } = useAppStore();
  const router = useRouter();
  const { token } = useAuth();

  const mutationCreate = useMutation({
    mutationFn: async (data: ProductSchema) => {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("code", data.code);
      formData.append("price", String(data.price));
      formData.append("technology", data.technology);
      formData.append("product_type_id", data.product_type_id);

      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      console.log("Contenido de FormData:");
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`${key}: [File] ${value.name}`);
        } else {
          console.log(`${key}:`, value);
        }
      }

      console.log([...formData.entries()]);

      const res = await fetch(API_ROUTES.PRODUCT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Error al crear producto");

      const response = res.json();
      console.log('respuesta', response)

      return response;
    },
    onSuccess: () => {
      setLockScreen(false);
      router.push("/dashboard/product");
      showToast("Producto creado", "Se creó correctamente", "success");
    },
    onError: (error) => {
      setLockScreen(false);

      showToast(
        'El producto no se pudo crear.',
        `Error: ${error.message}`,
        "error"
      );
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: ProductSchema }) => {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("code", data.code);
      formData.append("price", String(data.price));
      formData.append("technology", data.technology);
      formData.append("product_type_id", data.product_type_id);

      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      const res = await fetch(`${API_ROUTES.PRODUCT}/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Error al actualizar el producto");

      return res.json();
    },
    onSuccess: () => {
      setLockScreen(false);
      router.push("/dashboard/product");
      showToast("Producto actualizado", "Se actualizó correctamente.", "success");
    },
    onError: (error) => {
      setLockScreen(false);
      showToast("Error", error.message, "error");
    }
  });

  const mutationHardDelete = useMutation<string, Error, string>({
    mutationFn: async (id: string) => await FetchHelper<Product>({
      token: token ?? '',
      baseUrl: `${API_ROUTES.PRODUCT_HARD_DELETE}/${id}`,
      method: "DELETE"
    }),
    onSuccess: () => {
      refetch?.();

      setLockScreen(false);

      showToast(
        'El producto permanentemente eliminado.',
        'El producto fue eliminada permanentemente exitosamente.',
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
    mutationFn: async (id: string) => await FetchHelper<Product>({
      token: token ?? '',
      baseUrl: `${API_ROUTES.PRODUCT_SOFT_DELETE}/${id}`,
      method: "DELETE"
    }),
    onSuccess: () => {
      refetch?.();

      setLockScreen(false);

      showToast(
        'Producto eliminado.',
        'El producto fue eliminada exitosamente.',
        "success"
      );
    },
    onError: (error) => {
      setLockScreen(false);

      showToast(
        'El producto no se pudo eliminar.',
        `Error: ${error.message}`,
        "error"
      );
    },
  });

  const handleSoftDelete = async (id: string) => {
    setLockScreen({
      isVisible: true,
      type: "loading",
      content: "Eliminando el producto",
    });

    mutationSoftDelete.mutate(id);
  };

  const mutationRestore = useMutation<string, Error, string>({
    mutationFn: async (id: string) => await FetchHelper<Product>({
      token: token ?? '',
      baseUrl: `${API_ROUTES.PRODUCT_TYPE_RESTORE}/${id}`,
      method: "POST"
    }),
    onSuccess: () => {
      refetch?.();

      setLockScreen(false);

      showToast(
        'El producto restaurada.',
        'El producto fue restaurada exitosamente.',
        "success"
      );
    },
    onError: (error) => {
      setLockScreen(false);

      showToast(
        'El producto no se pudo restaurar.',
        `Error: ${error.message}`,
        "error"
      );
    },
  });

  const handleRestore = async (id: string) => {
    setLockScreen({
      isVisible: true,
      type: "loading",
      content: "Restuarando el producto",
    });

    mutationRestore.mutate(id);
  };

  const mutationUploadImages = useMutation({
    mutationFn: async ({ id, images }: { id: string; images: File[] }) => {
      const formData = new FormData();

      images.forEach((file) => {
        formData.append("images", file);
      });

      const res = await fetch(`${API_ROUTES.PRODUCT_IMAGES}/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Error al subir imágenes");

      return res.json();
    },
    onSuccess: () => {
      showToast("Imágenes actualizadas", "Las imágenes fueron subidas correctamente", "success");
    },
    onError: (error) => {
      showToast("Error", error.message, "error");
    }
  });

  const mutationDeleteImages = useMutation<string, Error, string>({
    mutationFn: async (id: string) => await FetchHelper<Product>({
      token: token ?? '',
      baseUrl: `${API_ROUTES.PRODUCT_IMAGES}/${id}`,
      method: "DELETE"
    }),
    onSuccess: () => {
      refetch?.();

      setLockScreen(false);

      showToast(
        'Se eliminaron todas las imagenes del producto de forma exitosa.',
        'Se eliminaron las imagenes exitosamente.',
        "success"
      );
    },
    onError: (error) => {
      setLockScreen(false);

      showToast(
        'No se pudieron eliminar las imagenes del producto.',
        `Error: ${error.message}`,
        "error"
      );
    },
  });

  return {
    mutationCreate,
    mutationUpdate,
    mutationHardDelete,
    mutationUploadImages,
    mutationDeleteImages,
    handleSoftDelete,
    handleRestore
  };
}