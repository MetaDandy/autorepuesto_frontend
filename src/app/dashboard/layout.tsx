'use client'

import { AppSidebar } from "@/components/app-sidebar"
import BreadcrumbDynamic from "@/components/layouts/breadcrumb_dynamic"
import { ThemeToggle } from "@/components/theme_toggle"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { useAuth } from "@/hooks/use_auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    const { isAuthenticated, isHydrated } = useAuth()

    useEffect(() => {
        if (isHydrated && !isAuthenticated()) {
            router.replace("/")
        }
    }, [isHydrated])

    // Fallback opcional mientras se hidrata el store
    if (!isHydrated) {
        return (
            <div className="p-4 text-muted-foreground">
                Verificando sesión...
            </div>
        )
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <ThemeToggle />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <BreadcrumbDynamic />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
