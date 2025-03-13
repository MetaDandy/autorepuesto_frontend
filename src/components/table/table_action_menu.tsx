'use client';

import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

type TableAction = {
  label: string
  onClick: () => void
  icon?: ReactNode
  variant?: string
}

type Props = {
  actions: TableAction[]
}

export const TableActionMenu = ({ actions }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">Acciones</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map((action, i) => (
          <DropdownMenuItem
            key={i}
            onClick={action.onClick}
            className={action.variant === "destructive" ? "text-red-500" : ""}
          >
            {action.icon && <span className="mr-2">{action.icon}</span>}
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
