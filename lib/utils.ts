import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  // Format as INR ₹ currency representation
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).toUpperCase();
}

export function getExpiryStatus(daysLeft: number): 'expired' | 'critical' | 'warning' | 'safe' {
  if (daysLeft <= 0) return 'expired';
  if (daysLeft < 30) return 'critical';
  if (daysLeft <= 90) return 'warning';
  return 'safe';
}

export function getExpiryBadgeStyles(status: 'expired' | 'critical' | 'warning' | 'safe') {
  switch (status) {
    case 'expired':
      return {
        bg: 'bg-text-muted/10',
        text: 'text-text-muted',
        border: 'border-text-muted/30',
        label: 'EXPIRED',
        dot: 'bg-text-muted'
      };
    case 'critical':
      return {
        bg: 'bg-danger/10',
        text: 'text-danger',
        border: 'border-danger/25',
        label: 'CRITICAL (<30d)',
        dot: 'bg-danger glow-danger'
      };
    case 'warning':
      return {
        bg: 'bg-warning/10',
        text: 'text-warning',
        border: 'border-warning/25',
        label: 'WARNING (30-90d)',
        dot: 'bg-warning glow-amber'
      };
    case 'safe':
      return {
        bg: 'bg-success/15',
        text: 'text-success',
        border: 'border-success/20',
        label: 'SAFE (>90d)',
        dot: 'bg-success glow-success'
      };
  }
}

export function formatTimeAgo(dateString?: string): string {
  if (!dateString) return 'JUST NOW';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'JUST NOW';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} MIN AGO`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} HR AGO`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'YESTERDAY';
  return `${days} DAYS AGO`;
}

