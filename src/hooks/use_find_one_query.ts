import { useQuery } from "@tanstack/react-query";

export function useFindOneQuery<T>(key: string, baseUrl: string, id: string) {
  return useQuery<T>({
    queryKey: [key, id],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/${id}`);
      if (!res.ok) throw new Error("Error al obtener item");
      return res.json();
    },
    enabled: !!id,
  });
}
