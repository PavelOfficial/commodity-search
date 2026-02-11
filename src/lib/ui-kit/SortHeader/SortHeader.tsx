import type { ReactNode } from 'react';
import type { SortChangeOptions } from '../../../model/storeTypes';

interface SortHeaderProps {
    order: "asc" | "desc" | null
    sortBy: string | null
    onSortChange: (options: SortChangeOptions) => void
    name: string
    children: ReactNode
}

export const SortHeader = ({ 
    order,
    sortBy,
    onSortChange,
    name,
    children,
}: SortHeaderProps) => {
    const handleClick = () => {
        if (sortBy === name) {
            if (order === "asc") {
                onSortChange({
                    order: "desc",
                    sortBy: name,
                })
            } else if (order === "desc") {
                onSortChange({
                    order: "asc",
                    sortBy: name,
                })
            } else {
                onSortChange({
                    order: "asc",   
                    sortBy: name,
                })
            }
        } else {
            onSortChange({
                order: "asc",   
                sortBy: name,
            })
        }
    };

    return (
        <button type="button" onClick={handleClick}>
            {children}
            {sortBy === name && order === "asc" && "↑"}
            {sortBy === name && order === "desc" && "↓"}            
        </button>
    );
}