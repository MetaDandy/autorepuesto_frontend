import { useState, useCallback, useEffect } from "react";
import Dropzone from "react-dropzone";
import { Button } from "@/components/ui/button";

type UploadImage = {
  file: File;
  preview: string;
};

export function ProductImageUploader({
  currentCount,
  maxImages = 4,
  onUpload,
}: {
  currentCount: number;
  maxImages?: number;
  onUpload: (files: File[]) => void;
}) {
  const [files, setFiles] = useState<UploadImage[]>([]);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const remaining = maxImages - currentCount - files.length;
      const allowedFiles = acceptedFiles.slice(0, remaining);

      const mappedFiles = allowedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setFiles((prev) => [...prev, ...mappedFiles]);
    },
    [files.length, currentCount, maxImages]
  );

  const handleRemoveImage = (index: number) => {
    const removed = files[index];
    URL.revokeObjectURL(removed.preview); // cleanup
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (files.length === 0) return;
    onUpload(files.map((f) => f.file));
    setFiles([]); // limpiar tras subida
  };

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      files.forEach((f) => URL.revokeObjectURL(f.preview));
    };
  }, [files]);

  return (
    <div className="space-y-4">
      <Dropzone
        onDrop={handleDrop}
        accept={{ "image/*": [] }}
        multiple
        maxFiles={maxImages - currentCount}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            {...getRootProps()}
            className={`border border-dashed border-gray-300 p-4 rounded-md text-center cursor-pointer hover:bg-muted/30 transition ${
              isDragActive ? "bg-muted" : ""
            }`}
          >
            <input {...getInputProps()} />
            <p className="text-sm text-muted-foreground">
              {isDragActive
                ? "Suelta las imágenes aquí"
                : `Arrastra o haz clic para subir imágenes (máx ${maxImages - currentCount})`}
            </p>
          </div>
        )}
      </Dropzone>

      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {files.map((f, idx) => (
            <div key={idx} className="relative border p-2 rounded-md">
              <img
                src={f.preview}
                alt={`preview-${idx}`}
                className="w-full h-32 object-contain rounded"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-1 right-1 text-xs px-2 py-0.5"
                onClick={() => handleRemoveImage(idx)}
              >
                X
              </Button>
            </div>
          ))}
        </div>
      )}

      <Button
        onClick={handleUpload}
        disabled={files.length === 0}
        className="mt-2"
      >
        Subir imágenes
      </Button>
    </div>
  );
}
