'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, LogOut, Menu } from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (val: boolean) => void;
}

export default function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen
}: SidebarProps) {
  const pathname = usePathname();

  const handleLinkClick = () => {
    setMobileOpen(false); // Close drawer on link selection on mobile
  };

  const sidebarContent = (
    <>
      {/* Brand logo container */}
      <div className={cn("px-6 py-6 border-b border-outline-variant/60 flex items-center justify-between", collapsed ? "justify-center" : "")}>
        {!collapsed && (
          <div>
            <h1 className="font-headline-md text-headline-md text-primary tracking-tight">PharmaStock Pro</h1>
            <p className="font-label-caps text-label-caps text-on-surface-variant mt-1.5 uppercase">Warehouse A-12</p>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded bg-accent-gradient text-on-primary-container flex items-center justify-center font-bold text-lg shadow-accent-glow">
            P
          </div>
        )}
      </div>

      {/* Navigation routes */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
        {ROUTES.map((route) => {
          const isActive = pathname === route.path;
          return (
            <Link
              key={route.path}
              href={route.path}
              onClick={handleLinkClick}
              className={cn(
                "group flex items-center gap-3 px-4 py-3 transition-all duration-200 ease-smooth rounded active:scale-[0.98]",
                isActive
                  ? "bg-primary/10 text-primary border-l-[3px] border-primary font-semibold shadow-clinical"
                  : "text-on-surface-variant hover:bg-surface-variant/40 hover:text-on-surface hover:translate-x-0.5",
                collapsed ? "justify-center px-2" : ""
              )}
              title={collapsed ? route.label : undefined}
            >
              <span className={cn(
                "material-symbols-outlined text-xl flex-shrink-0 transition-transform duration-200",
                isActive ? "scale-110" : "group-hover:scale-110"
              )}>{route.icon}</span>
              {!collapsed && <span className="font-label-caps text-label-caps text-[11px] tracking-wider uppercase">{route.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Log out segment */}
      <div className="px-3 border-t border-outline-variant/60 py-3">
        <Link
          href="/login"
          className={cn(
            "flex items-center gap-3 px-4 py-3 text-danger/80 hover:bg-danger/10 hover:text-danger rounded active:scale-[0.98] transition-all",
            collapsed ? "justify-center px-2" : ""
          )}
          title={collapsed ? "Log out" : undefined}
        >
          <span className="material-symbols-outlined text-xl">logout</span>
          {!collapsed && <span className="font-label-caps text-label-caps text-[11px] tracking-wider uppercase">Logout</span>}
        </Link>
      </div>

      {/* User profile segment */}
      <div className={cn("px-6 py-4 border-t border-outline-variant/60 flex items-center gap-3 bg-surface-container-low/50", collapsed ? "justify-center" : "")}>
        <div className="w-10 h-10 rounded bg-secondary-container flex items-center justify-center text-primary font-bold border border-outline-variant flex-shrink-0">
          JD
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="font-label-caps text-label-caps text-on-surface text-[12px] truncate">John Doe</p>
            <p className="text-[10px] text-on-surface-variant/80 uppercase tracking-widest truncate">Inv. Manager</p>
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar backdrop/collapsible structural component */}
      <aside
        className={cn(
          "hidden md:flex flex-col h-full bg-surface-container border-r border-outline-variant/85 transition-all duration-300 z-40 relative flex-shrink-0",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {sidebarContent}
        {/* Toggle arrow on desktop sidebar boundary */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-outline bg-surface-container-high text-on-surface-variant hover:text-accent hover:border-accent flex items-center justify-center z-50 shadow transition-colors"
        >
          {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>
      </aside>

      {/* Mobile Drawer (overlay sidebar) */}
      <div
        className={cn(
          "md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-50 transition-opacity duration-300",
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileOpen(false)}
      >
        <aside
          className={cn(
            "fixed inset-y-0 left-0 w-64 bg-surface-container border-r border-outline-variant flex flex-col transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {sidebarContent}
        </aside>
      </div>
    </>
  );
}
