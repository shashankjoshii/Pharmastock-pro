'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T, index: number) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  className?: string;
  emptyMessage?: string;
}

export default function DataTable<T>({
  columns,
  data,
  onRowClick,
  className,
  emptyMessage = "No records found."
}: DataTableProps<T>) {
  return (
    <div className={cn("overflow-x-auto w-full border border-outline/70 rounded-clinical bg-surface-container", className)}>
      <div className="min-w-full inline-block align-middle">
        <div className="overflow-hidden">
          <table className="w-full text-left border-collapse table-auto">
            <thead className="bg-surface-container-low border-b border-outline-variant/60 font-label-caps text-label-caps text-on-surface-variant sticky top-0 z-10">
              <tr>
                {columns.map((column, idx) => (
                  <th
                    key={idx}
                    className={cn(
                      "px-6 py-4 font-semibold text-[10px] tracking-wider uppercase whitespace-nowrap",
                      column.className
                    )}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/30">
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-10 text-center text-body-sm text-text-muted"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                data.map((row, rowIdx) => (
                  <tr
                    key={rowIdx}
                    onClick={() => onRowClick && onRowClick(row)}
                    className={cn(
                      "transition-colors duration-100 font-mono-data text-body-sm",
                      // Alternating surface / surface-low (subtle zebra)
                      rowIdx % 2 === 0 ? "bg-surface-container" : "bg-surface-container-low/60",
                      onRowClick ? "cursor-pointer hover:bg-surface-container-high/70" : "hover:bg-surface-container-high/40"
                    )}
                  >
                    {columns.map((column, colIdx) => {
                      const value =
                        typeof column.accessor === 'function'
                          ? column.accessor(row, rowIdx)
                          : (row[column.accessor] as React.ReactNode);

                      return (
                        <td
                          key={colIdx}
                          className={cn(
                            "px-6 py-3.5 text-on-surface-variant border-b border-outline/20 font-medium",
                            column.className
                          )}
                        >
                          {value}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
