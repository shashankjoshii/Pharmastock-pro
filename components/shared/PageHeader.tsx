'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export default function PageHeader({
  title,
  description,
  actions,
  className
}: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 animate-fade-in-up", className)}>
      <div>
        <h2 className="font-display-lg text-display-lg text-on-surface tracking-tight">{title}</h2>
        {description && (
          <p className="font-body-md text-body-md text-on-surface-variant mt-1.5">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          {actions}
        </div>
      )}
    </div>
  );
}
