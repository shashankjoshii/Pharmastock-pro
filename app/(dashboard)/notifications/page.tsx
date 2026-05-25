'use client';

import * as React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { useNotifications } from '@/hooks/useNotifications';
import { Bell, Trash2, CheckSquare, ShieldAlert, Circle, AlertCircle } from 'lucide-react';
import { formatTimeAgo } from '@/lib/utils';

export default function NotificationsPage() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotification
  } = useNotifications();

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'expiry':
        return <AlertCircle className="h-5 w-5 text-danger" />;
      case 'stock':
        return <AlertCircle className="h-5 w-5 text-warning" />;
      case 'vendor':
        return <ShieldAlert className="h-5 w-5 text-primary" />;
      default:
        return <Bell className="h-5 w-5 text-primary" />;
    }
  };

  const getAlertBg = (type: string, read: boolean) => {
    if (read) return 'bg-surface-container-low border-outline/30';
    if (type === 'expiry') return 'bg-danger/5 border-danger/25';
    if (type === 'stock') return 'bg-warning/5 border-warning/25';
    return 'bg-primary/5 border-primary/20';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Alert Center"
        description="Review logistics exceptions, regulatory reports, and threshold breaches."
        actions={
          unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-high border border-outline hover:border-accent hover:text-accent transition-all font-label-caps text-label-caps text-[11px] rounded-clinical active:scale-95 text-on-surface-variant font-bold"
            >
              <CheckSquare className="h-4 w-4 text-accent" />
              MARK ALL READ
            </button>
          )
        }
      />

      <div className="max-w-4xl mx-auto space-y-4">
        {/* Unread count box banner */}
        <div className="bg-surface-container p-4 border border-outline/70 rounded-clinical flex justify-between items-center bg-surface-container-low/40">
          <span className="text-body-sm font-medium text-on-surface-variant">
            Unread Notifications: <strong className="text-on-surface">{unreadCount} active</strong>
          </span>
          <span className="text-xs text-text-muted font-mono-data">LED CHIPS COLOR-CODED BY HAZARD</span>
        </div>

        {/* Notifications list */}
        <div className="space-y-3">
          {notifications.length === 0 ? (
            <div className="bg-surface-container p-10 border border-outline/70 rounded-clinical text-center text-body-sm text-text-muted">
              All alert systems operating at nominal capacity. No active alerts.
            </div>
          ) : (
            notifications.map((notif) => {
              const bgClass = getAlertBg(notif.type, notif.read);
              return (
                <div
                  key={notif.id}
                  className={`p-4 border rounded-clinical flex items-start gap-4 transition-all ${bgClass}`}
                >
                  {/* Alert Icon indicator */}
                  <div className="mt-0.5 flex-shrink-0">
                    {getAlertIcon(notif.type)}
                  </div>

                  {/* Body text details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className={`font-body-sm text-sm font-semibold ${notif.read ? 'text-on-surface-variant/80' : 'text-on-surface'}`}>
                        {notif.message}
                      </h4>
                      {!notif.read && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 text-[8px] font-bold tracking-wider font-mono-data uppercase">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-text-muted mt-1 font-mono-data uppercase tracking-wide">
                      {formatTimeAgo(notif.timestamp)}
                    </p>
                  </div>

                  {/* Actions segment (read toggle, clear) */}
                  <div className="flex items-center gap-2 flex-shrink-0 self-center">
                    {!notif.read && (
                      <button
                        onClick={() => markAsRead(notif.id)}
                        className="p-1.5 border border-outline hover:border-accent rounded text-on-surface-variant hover:text-accent bg-surface-container-low transition-colors"
                        title="Mark as Read"
                      >
                        <CheckSquare className="h-3.5 w-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => clearNotification(notif.id)}
                      className="p-1.5 border border-outline hover:border-danger rounded text-on-surface-variant hover:text-danger bg-surface-container-low transition-colors"
                      title="Clear Alert"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
