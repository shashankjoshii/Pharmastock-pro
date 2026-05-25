'use client';

import * as React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import DataTable from '@/components/shared/DataTable';
import StatusBadge from '@/components/shared/StatusBadge';
import ExportButtons from '@/components/shared/ExportButtons';
import { MOCK_EXPIRY_BATCHES, MOCK_PRODUCTS } from '@/lib/constants';
import { ExpiryBatch } from '@/lib/types';
import { useDebounce } from '@/hooks/useDebounce';
import { formatDate } from '@/lib/utils';
import { ShieldAlert, CheckCircle, Ban, AlertCircle } from 'lucide-react';

export default function ExpiryTrackerPage() {
  const [batches, setBatches] = React.useState<ExpiryBatch[]>(MOCK_EXPIRY_BATCHES);
  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearch = useDebounce(searchTerm, 250);
  const [riskFilter, setRiskFilter] = React.useState<string>('All');

  const handleQuarantine = (batchId: string) => {
    setBatches(prev =>
      prev.map(b => (b.id === batchId ? { ...b, quarantined: true } : b))
    );
    console.log(`Batch ${batchId} marked as quarantined`);
  };

  const getDaysRemainingLabel = (days: number) => {
    if (days < 0) return 'Expired';
    if (days === 0) return 'Expires Today';
    if (days === 1) return '1 Day';
    return `${days} Days`;
  };

  // Filtered batches
  const filteredBatches = React.useMemo(() => {
    return batches.filter(batch => {
      const product = MOCK_PRODUCTS.find(p => p.id === batch.productId);
      const productName = product ? product.name : '';

      const matchesSearch =
        productName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        batch.batchNo.toLowerCase().includes(debouncedSearch.toLowerCase());

      const matchesRisk =
        riskFilter === 'All' ||
        (riskFilter === 'Quarantined' && batch.quarantined) ||
        (riskFilter === 'Expired' && batch.status === 'expired' && !batch.quarantined) ||
        (riskFilter === 'Critical' && batch.status === 'critical' && !batch.quarantined) ||
        (riskFilter === 'Warning' && batch.status === 'warning' && !batch.quarantined) ||
        (riskFilter === 'Safe' && batch.status === 'safe' && !batch.quarantined);

      return matchesSearch && matchesRisk;
    });
  }, [batches, debouncedSearch, riskFilter]);

  // Aggregate stats
  const stats = React.useMemo(() => {
    const active = batches.filter(b => !b.quarantined);
    const expiredCount = active.filter(b => b.status === 'expired').length;
    const criticalCount = active.filter(b => b.status === 'critical').length;
    const warningCount = active.filter(b => b.status === 'warning').length;
    const quarantinedCount = batches.filter(b => b.quarantined).length;

    return { expiredCount, criticalCount, warningCount, quarantinedCount };
  }, [batches]);

  const columns = [
    {
      header: 'BATCH NO',
      accessor: (row: ExpiryBatch) => (
        <span className="font-semibold text-on-surface font-mono-data">{row.batchNo}</span>
      ),
      className: 'w-[140px]'
    },
    {
      header: 'PRODUCT NAME',
      accessor: (row: ExpiryBatch) => {
        const product = MOCK_PRODUCTS.find(p => p.id === row.productId);
        return <span className="text-on-surface font-medium">{product ? product.name : 'Unknown SKU'}</span>;
      }
    },
    {
      header: 'EXPIRY DATE',
      accessor: (row: ExpiryBatch) => <span>{formatDate(row.expiryDate)}</span>,
      className: 'w-[130px]'
    },
    {
      header: 'REMAINING TIME',
      accessor: (row: ExpiryBatch) => {
        if (row.quarantined) {
          return <span className="text-danger font-semibold">QUARANTINED</span>;
        }
        const isExp = row.daysLeft <= 0;
        return (
          <span className={isExp ? 'text-danger font-bold animate-pulse' : 'text-on-surface-variant'}>
            {getDaysRemainingLabel(row.daysLeft)}
          </span>
        );
      },
      className: 'w-[130px]'
    },
    {
      header: 'RISK ASSESSMENT',
      accessor: (row: ExpiryBatch) => {
        if (row.quarantined) {
          return <StatusBadge status="critical" className="bg-danger/20" />;
        }
        return <StatusBadge status={row.status} />;
      },
      className: 'w-[140px]'
    },
    {
      header: 'ACTION',
      accessor: (row: ExpiryBatch) => {
        if (row.quarantined) {
          return (
            <span className="inline-flex items-center gap-1 text-[10px] text-danger font-bold uppercase tracking-wider bg-danger/10 border border-danger/25 px-2.5 py-1 rounded">
              <Ban className="h-3 w-3 stroke-[2.5px]" />
              LOCKED
            </span>
          );
        }

        const isRisk = row.status === 'expired' || row.status === 'critical';

        return (
          <button
            onClick={() => handleQuarantine(row.id)}
            disabled={row.quarantined}
            className={`flex items-center justify-center gap-1.5 px-3 py-1 font-label-caps text-label-caps text-[9px] rounded-clinical font-bold transition-all active:scale-95 border ${
              isRisk
                ? 'bg-danger text-[#FFF2F2] border-danger/50 hover:bg-danger/90'
                : 'bg-surface-container-high border-outline hover:border-accent text-on-surface-variant hover:text-accent'
            }`}
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            QUARANTINE
          </button>
        );
      },
      className: 'text-right w-[140px]'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Expiry Tracker"
        description="Monitor chemical life-cycles, quarantine compromised batches, and maintain clinical safety."
        actions={<ExportButtons />}
      />

      {/* Expiry Risk Overview Mini Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Expired stat */}
        <div className="bg-surface-container p-4 border border-outline/50 rounded-clinical flex items-center justify-between">
          <div>
            <span className="font-label-caps text-[9px] text-text-muted uppercase block">EXPIRED BATCHES</span>
            <span className="text-xl font-bold font-kpi-numeric text-danger mt-1 block">{stats.expiredCount}</span>
          </div>
          <AlertCircle className="h-8 w-8 text-danger/30" />
        </div>

        {/* Critical stat */}
        <div className="bg-surface-container p-4 border border-outline/50 rounded-clinical flex items-center justify-between">
          <div>
            <span className="font-label-caps text-[9px] text-text-muted uppercase block">CRITICAL (&lt; 30d)</span>
            <span className="text-xl font-bold font-kpi-numeric text-warning mt-1 block">{stats.criticalCount}</span>
          </div>
          <AlertCircle className="h-8 w-8 text-warning/30" />
        </div>

        {/* Warning stat */}
        <div className="bg-surface-container p-4 border border-outline/50 rounded-clinical flex items-center justify-between">
          <div>
            <span className="font-label-caps text-[9px] text-text-muted uppercase block">WARNING (3-6m)</span>
            <span className="text-xl font-bold font-kpi-numeric text-primary mt-1 block">{stats.warningCount}</span>
          </div>
          <AlertCircle className="h-8 w-8 text-primary/30" />
        </div>

        {/* Quarantined stat */}
        <div className="bg-surface-container p-4 border border-outline/50 rounded-clinical flex items-center justify-between">
          <div>
            <span className="font-label-caps text-[9px] text-text-muted uppercase block">QUARANTINED LOCKS</span>
            <span className="text-xl font-bold font-kpi-numeric text-[#E84040] mt-1 block">{stats.quarantinedCount}</span>
          </div>
          <ShieldAlert className="h-8 w-8 text-danger/20" />
        </div>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 bg-surface-container p-4 clinical-border rounded-clinical">
        {/* Search */}
        <div className="relative xl:col-span-2">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/70 text-sm">
            search
          </span>
          <input
            type="text"
            className="bg-background border border-outline focus:border-accent text-on-surface w-full h-10 pl-10 pr-4 rounded-clinical font-mono-data focus:ring-0 focus:outline-none placeholder-on-surface-variant/30 text-sm"
            placeholder="Search by Batch or Product Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Risk Level filter options */}
        <div className="flex items-center gap-2 xl:col-span-2">
          <span className="material-symbols-outlined text-on-surface-variant text-sm flex-shrink-0">filter_alt</span>
          <div className="flex flex-wrap gap-1.5 w-full">
            {['All', 'Expired', 'Critical', 'Warning', 'Safe', 'Quarantined'].map((risk) => (
              <button
                key={risk}
                onClick={() => setRiskFilter(risk)}
                className={`px-2.5 py-1.5 rounded-clinical text-[10px] font-bold font-label-caps border transition-all ${
                  riskFilter === risk
                    ? 'bg-primary text-background border-primary'
                    : 'bg-surface-container-low border-outline text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {risk.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Expiry Batches Table */}
      <div className="bg-surface-container p-1 clinical-border rounded-clinical">
        <DataTable
          columns={columns}
          data={filteredBatches}
          emptyMessage="No batches fit the selected expiry filters."
        />
      </div>
    </div>
  );
}
