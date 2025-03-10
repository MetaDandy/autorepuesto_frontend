// components/layouts/breadcrumb-dynamic.tsx
"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// Diccionario de traducciones de rutas
const routeNameMap: Record<string, string> = {
  dashboard: "Dashboard",
  users: "Usuarios",
  settings: "Configuración",
  profile: "Perfil",
  "": "Inicio",
}

export default function BreadcrumbDynamic() {
  const pathname = usePathname() // e.g. "/dashboard/users/123"
  const segments = pathname.split("/").filter(Boolean)

  const buildHref = (index: number) =>
    "/" + segments.slice(0, index + 1).join("/")

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, i) => {
          const name = routeNameMap[segment] || decodeURIComponent(segment)
          const isLast = i === segments.length - 1

          return (
            <span key={i} className="flex items-center">
              {i !== 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={buildHref(i)}>{name}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </span>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
