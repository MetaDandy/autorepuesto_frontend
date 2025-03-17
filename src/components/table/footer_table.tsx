'use client'

import { Button } from '@/components/ui/button'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select'
import { PaginationState } from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

type TableFooterProps = {
    pagination: PaginationState
    pageCount: number
    onPageSizeChange: (pageSize: number) => void
    onPageChange: (newPageIndex: number) => void
}

export function TableFooter({
    pagination,
    pageCount,
    onPageSizeChange,
    onPageChange,
}: TableFooterProps) {
    function getVisiblePages(currentPage: number, totalPages: number, delta: number = 2): (number | string)[] {
        const pages: (number | string)[] = []
        const rangeStart = Math.max(1, currentPage + 1 - delta)
        const rangeEnd = Math.min(totalPages, currentPage + 1 + delta)

        if (rangeStart > 1) {
            pages.push(1)
            if (rangeStart > 2) {
                pages.push("...")
            }
        }

        for (let i = rangeStart; i <= rangeEnd; i++) {
            pages.push(i)
        }

        if (rangeEnd < totalPages) {
            if (rangeEnd < totalPages - 1) {
                pages.push("...")
            }
            pages.push(totalPages)
        }

        return pages
    }


    const visiblePages = getVisiblePages(pagination.pageIndex, pageCount)

    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Controles de navegación por página */}
            <div className="flex items-center gap-1 flex-wrap">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(0)}
                    disabled={pagination.pageIndex === 0}
                >
                    <ChevronsLeft className="w-4 h-4" />
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(pagination.pageIndex - 1)}
                    disabled={pagination.pageIndex === 0}
                >
                    <ChevronLeft className="w-4 h-4" />
                </Button>

                {visiblePages.map((page, index) => {
                    if (page === '...') {
                        return (
                            <span key={`ellipsis-${index}`} className="px-2 text-sm text-muted-foreground">…</span>
                        )
                    }

                    const pageNumber = Number(page)

                    return (
                        <Button
                            type="button"
                            key={`page-${pageNumber}`}
                            variant={pagination.pageIndex + 1 === pageNumber ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => onPageChange(pageNumber - 1)}
                        >
                            {pageNumber}
                        </Button>
                    )
                })}


                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(pagination.pageIndex + 1)}
                    disabled={pagination.pageIndex + 1 >= pageCount}
                >
                    <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(pageCount - 1)}
                    disabled={pagination.pageIndex + 1 >= pageCount}
                >
                    <ChevronsRight className="w-4 h-4" />
                </Button>
            </div>

            {/* Selector de page size */}
            <div className="flex items-center gap-2">
                <span className="text-sm">Filas por página:</span>
                <Select
                    value={pagination.pageSize.toString()}
                    onValueChange={(value) => onPageSizeChange(parseInt(value))}
                >
                    <SelectTrigger className="w-20">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {[5, 10, 20].map((size) => (
                            <SelectItem key={size} value={size.toString()}>
                                {size}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
