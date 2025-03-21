'use client';
import useAppStore from "@/lib/store";
import { cn } from "@/lib/utils"
import { Button } from "./ui/button";

export const ImageWithTitle = ({
  title,
  src,
  className,
}: {
  title: string
  src?: string
  className?: string
}) => {
  const { setModal } = useAppStore();

  return (
    <>
      <div
        className={cn("flex flex-col items-center gap-2 cursor-pointer", className)}
        onClick={() => src && setModal({
          title,
          btnAction:
            <Button onClick={() => setModal(false)}>
              Cerrar
            </Button>,
          content:
            <img
              src={src}
              alt={title}
            />,
          description: '',
          isOpen: true,
        })}
      >
        <p className="text-sm font-medium text-center">{title}</p>
        <div className="overflow-hidden rounded-md border transition-transform duration-200 hover:scale-105">
          {src &&
            <img
            src={src}
            alt={title}
            className="w-24 h-24 object-cover"
          />
          }
        </div>
      </div>
    </>
  )
}
