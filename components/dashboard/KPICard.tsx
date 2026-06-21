'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
  type?: 'progress' | 'sparkline' | 'alert' | 'avatars';
  progressValue?: number; // for type="progress"
  badgeText?: string; // for type="alert"
  subtitle?: string; // e.g. "SKUs < 30d" or "Units"
  extraInfo?: React.ReactNode; // custom rendering
  className?: string;
}

export default function KPICard({
  title,
  value,
  trend,
  trendType = 'positive',
  type = 'progress',
  progressValue = 70,
  badgeText,
  subtitle,
  extraInfo,
  className
}: KPICardProps) {
  const getTrendColor = () => {
    if (trendType === 'positive') return 'text-primary';
    if (trendType === 'negative') return 'text-danger';
    return 'text-text-muted';
  };

  return (
    <div className={cn("bg-surface-container p-6 clinical-border shadow-clinical card-hover relative overflow-hidden group rounded-clinical", className)}>
      {/* Visual background glow decor */}
      {type === 'progress' && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 -mr-12 -mt-12 rounded-full blur-2xl pointer-events-none transition-opacity duration-300 group-hover:opacity-80"></div>
      )}
      {/* Accent edge that lights up on hover */}
      <div className="absolute left-0 top-0 h-full w-[3px] bg-accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Header section with optional badge */}
      <div className="flex justify-between items-start mb-2">
        <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-[11px]">{title}</p>
        {type === 'alert' && badgeText && (
          <span className="bg-danger/10 text-danger px-2 py-0.5 rounded text-[9px] font-bold border border-danger/25 uppercase tracking-tighter glow-danger">
            {badgeText}
          </span>
        )}
      </div>

      {/* Primary values row */}
      <div className="flex items-baseline gap-2">
        <span className={cn(
          "font-kpi-numeric text-kpi-numeric text-on-surface font-semibold tracking-tight",
          type === 'alert' ? 'text-danger' : 'text-on-surface'
        )}>
          {value}
        </span>
        {trend && (
          <span className={cn("text-[12px] font-bold", getTrendColor())}>
            {trend}
          </span>
        )}
        {subtitle && (
          <span className="text-on-surface-variant/80 text-[12px] font-medium">
            {subtitle}
          </span>
        )}
      </div>

      {/* Bottom visualization segment */}
      <div className="mt-4">
        {type === 'progress' && (
          <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <div
              className="h-full bg-accent-gradient rounded-full transition-all duration-700 ease-smooth"
              style={{ width: `${progressValue}%` }}
            ></div>
          </div>
        )}

        {type === 'sparkline' && (
          <div className="flex gap-1 h-10 items-end">
            <div className="h-6 w-full bg-surface-container-highest/60 rounded-sm"></div>
            <div className="h-8 w-full bg-surface-container-highest/60 rounded-sm"></div>
            <div className="h-10 w-full bg-primary rounded-sm transition-all duration-300"></div>
            <div className="h-4 w-full bg-surface-container-highest/60 rounded-sm"></div>
            <div className="h-7 w-full bg-surface-container-highest/60 rounded-sm"></div>
          </div>
        )}

        {type === 'alert' && (
          <div className="flex items-center gap-2 text-on-surface-variant text-sm">
            <span className="material-symbols-outlined text-[16px] text-danger leading-none">warning</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant/90">{extraInfo || "Requires immediate quarantine"}</span>
          </div>
        )}

        {type === 'avatars' && (
          <div className="flex -space-x-1.5">
            <div className="w-6 h-6 rounded-full border border-surface bg-primary/20 flex items-center justify-center text-[10px] text-primary font-bold">A</div>
            <div className="w-6 h-6 rounded-full border border-surface bg-secondary-container flex items-center justify-center text-[10px] text-on-secondary-container font-bold">B</div>
            <div className="w-6 h-6 rounded-full border border-surface bg-outline-variant flex items-center justify-center text-[10px] text-on-surface-variant font-bold">C</div>
          </div>
        )}
      </div>
    </div>
  );
}
