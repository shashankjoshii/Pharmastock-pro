'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, Search, Plus, Bell, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TopnavProps {
  setMobileOpen: (val: boolean) => void;
  unreadNotifications: number;
  onNewPurchaseClick?: () => void;
}

export default function Topnav({
  setMobileOpen,
  unreadNotifications,
  onNewPurchaseClick
}: TopnavProps) {
  return (
    <header className="flex justify-between items-center w-full px-margin-desktop h-16 z-30 bg-surface border-b border-outline-variant/65 sticky top-0">
      <div className="flex items-center gap-4 md:gap-8 flex-1">
        {/* Mobile toggle button */}
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-1 hover:bg-surface-variant/40 rounded transition-colors text-primary"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Global search input */}
        <div className="relative max-w-md w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/80 text-[18px]">
            search
          </span>
          <input
            className="bg-surface-container-low/80 border border-outline/50 focus:border-accent rounded-clinical pl-10 pr-4 py-1.5 w-full text-body-sm focus:ring-0 focus:outline-none placeholder-on-surface-variant/40 text-on-surface"
            placeholder="Search Inventory, SKUs, or Vendors..."
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        {/* Quick action button */}
        <button
          onClick={onNewPurchaseClick}
          className="bg-primary text-on-primary-container hover:opacity-90 active:scale-95 px-4 py-2 flex items-center gap-2 rounded-clinical font-label-caps text-label-caps transition-all text-[11px] font-semibold"
        >
          <Plus className="h-3.5 w-3.5 stroke-[3px]" />
          NEW PURCHASE
        </button>

        {/* Notification bell and user options segment */}
        <div className="flex items-center gap-4 border-l border-outline-variant/60 pl-6 h-8">
          <Link
            href="/notifications"
            className="relative p-1 text-on-surface-variant hover:text-accent transition-colors"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadNotifications > 0 && (
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-error rounded-full glow-danger"></span>
            )}
          </Link>
          
          <Link
            href="/settings"
            className="p-1 text-on-surface-variant hover:text-accent transition-colors"
            title="Account Settings"
          >
            <span className="material-symbols-outlined text-[22px]">account_circle</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
