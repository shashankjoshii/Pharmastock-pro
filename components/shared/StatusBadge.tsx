'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export type StatusType =
  | 'safe' | 'warning' | 'critical' | 'expired'
  | 'completed' | 'pending' | 'failed'
  | 'in_stock' | 'low_stock' | 'out_of_stock';

interface StatusBadgeProps {
  status: StatusType | string;
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const normStatus = status.toLowerCase().replace(/\s+/g, '_');

  const getBadgeStyle = () => {
    switch (normStatus) {
      // Expiry status
      case 'safe':
        return {
          bg: 'bg-success/10 text-success border-success/30',
          dot: 'bg-success glow-success',
          label: 'SAFE'
        };
      case 'warning':
        return {
          bg: 'bg-warning/10 text-warning border-warning/35',
          dot: 'bg-warning glow-amber',
          label: 'WARNING'
        };
      case 'critical':
        return {
          bg: 'bg-danger/10 text-danger border-danger/30',
          dot: 'bg-danger glow-danger',
          label: 'CRITICAL'
        };
      case 'expired':
        return {
          bg: 'bg-text-muted/15 text-text-muted border-text-muted/30',
          dot: 'bg-text-muted',
          label: 'EXPIRED'
        };
      
      // Transaction status
      case 'completed':
        return {
          bg: 'bg-primary/10 text-primary border-primary/30',
          dot: 'bg-primary glow-accent',
          label: 'COMPLETED'
        };
      case 'pending':
        return {
          bg: 'bg-warning/10 text-warning border-warning/30',
          dot: 'bg-warning glow-amber',
          label: 'PENDING'
        };
      case 'failed':
        return {
          bg: 'bg-danger/10 text-danger border-danger/35',
          dot: 'bg-danger glow-danger',
          label: 'FAILED'
        };

      // Stock status
      case 'in_stock':
        return {
          bg: 'bg-success/10 text-success border-success/30',
          dot: 'bg-success glow-success',
          label: 'IN STOCK'
        };
      case 'low_stock':
        return {
          bg: 'bg-warning/10 text-warning border-warning/30',
          dot: 'bg-warning glow-amber',
          label: 'LOW STOCK'
        };
      case 'out_of_stock':
        return {
          bg: 'bg-danger/10 text-danger border-danger/30',
          dot: 'bg-danger glow-danger',
          label: 'OUT OF STOCK'
        };

      default:
        return {
          bg: 'bg-surface-container-high text-on-surface-variant border-outline',
          dot: 'bg-on-surface-variant',
          label: status.toUpperCase()
        };
    }
  };

  const style = getBadgeStyle();

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded border font-mono-data text-[10px] font-bold tracking-wider",
        style.bg,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", style.dot)} />
      {style.label}
    </span>
  );
}
