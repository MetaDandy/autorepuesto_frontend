import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

export const ImageUploadField = ({ control, label }: { control: any, label: string }) => {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <FormField
      control={control}
      name="image"
      render={({ field }) => {
        const onDrop = useCallback((acceptedFiles: File[]) => {
          const file = acceptedFiles[0];
          field.onChange(file);
          const previewUrl = URL.createObjectURL(file);
          setPreview(previewUrl);
        }, [field]);

        const { getRootProps, getInputProps, isDragActive } = useDropzone({
          onDrop,
          accept: { "image/*": [] },
          multiple: false,
        });

        // Cleanup preview URL when component unmounts
        useEffect(() => {
          return () => {
            if (preview) URL.revokeObjectURL(preview);
          };
        }, [preview]);

        const handleRemoveImage = () => {
          field.onChange(undefined);
          setPreview(null);
        };

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <div
              {...getRootProps()}
              className={`border border-dashed border-gray-300 p-4 rounded-md text-center cursor-pointer hover:bg-muted/30 transition ${
                isDragActive ? "bg-muted" : ""
              }`}
            >
              <input {...getInputProps()} />
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="Vista previa"
                    className="mx-auto max-h-48 object-contain mb-2"
                  />
                  <Button type="button" variant="outline" onClick={handleRemoveImage}>
                    Eliminar imagen
                  </Button>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Arrastra y suelta una imagen aquí o haz clic para seleccionar una
                </p>
              )}
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
