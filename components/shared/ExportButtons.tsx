'use client';

import * as React from 'react';
import { Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExportButtonsProps {
  className?: string;
  onExport?: (format: 'pdf' | 'excel' | 'csv') => void;
}

export default function ExportButtons({ className, onExport }: ExportButtonsProps) {
  const handleExport = (format: 'pdf' | 'excel' | 'csv') => {
    if (onExport) {
      onExport(format);
    } else {
      console.log(`Export requested as ${format.toUpperCase()} (UI only)`);
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        onClick={() => handleExport('pdf')}
        className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-high border border-outline hover:border-accent hover:text-accent text-[11px] font-label-caps text-label-caps rounded-clinical active:scale-95 transition-all text-on-surface-variant font-semibold"
      >
        <span className="material-symbols-outlined text-sm leading-none">picture_as_pdf</span>
        EXPORT PDF
      </button>
      <button
        onClick={() => handleExport('excel')}
        className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-high border border-outline hover:border-accent hover:text-accent text-[11px] font-label-caps text-label-caps rounded-clinical active:scale-95 transition-all text-on-surface-variant font-semibold"
      >
        <span className="material-symbols-outlined text-sm leading-none">table_chart</span>
        EXPORT EXCEL
      </button>
      <button
        onClick={() => handleExport('csv')}
        className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-high border border-outline hover:border-accent hover:text-accent text-[11px] font-label-caps text-label-caps rounded-clinical active:scale-95 transition-all text-on-surface-variant font-semibold"
      >
        <span className="material-symbols-outlined text-sm leading-none">csv</span>
        EXPORT CSV
      </button>
    </div>
  );
}
