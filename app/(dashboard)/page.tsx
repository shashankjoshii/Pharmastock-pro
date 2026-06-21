'use client';

import * as React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import KPICard from '@/components/dashboard/KPICard';
import PurchaseTrendChart from '@/components/dashboard/PurchaseTrendChart';
import TopProductsChart from '@/components/dashboard/TopProductsChart';
import ExpiryDonutChart from '@/components/dashboard/ExpiryDonutChart';
import DataTable from '@/components/shared/DataTable';
import StatusBadge from '@/components/shared/StatusBadge';
import { ArrowRight, Plus, Download } from 'lucide-react';
import Link from 'next/link';

// Mock recent activities matching Stitch export exactly
interface Movement {
  id: string;
  productName: string;
  vendor: string;
  batch: string;
  qty: number;
  type: 'in' | 'out';
  status: string;
}

const recentMovements: Movement[] = [
  { id: '#TXN-98231', productName: 'CIPROFLOXACIN 250MG', vendor: 'MedLife Pharma Distributors', batch: 'B44-098', qty: 500, type: 'in', status: 'completed' },
  { id: '#TXN-98232', productName: 'DICLOFENAC GEL', vendor: 'Global Biotech Logistics', batch: 'X02-331', qty: 120, type: 'in', status: 'completed' },
  { id: '#TXN-98233', productName: 'PREDNISOLONE 5MG', vendor: 'Zenith Medical Supplies', batch: 'P99-102', qty: 300, type: 'out', status: 'pending' }
];

export default function DashboardPage() {
  const columns = [
    { header: 'TRANSACTION ID', accessor: 'id' as keyof Movement },
    {
      header: 'PRODUCT NAME',
      accessor: (row: Movement) => (
        <span className="text-on-surface font-semibold">{row.productName}</span>
      )
    },
    { header: 'VENDOR', accessor: 'vendor' as keyof Movement },
    { header: 'BATCH', accessor: 'batch' as keyof Movement },
    {
      header: 'QUANTITY',
      accessor: (row: Movement) => (
        <span className={row.type === 'in' ? 'text-primary' : 'text-danger'}>
          {row.type === 'in' ? '+' : '-'}{row.qty} Units
        </span>
      )
    },
    {
      header: 'STATUS',
      accessor: (row: Movement) => <StatusBadge status={row.status} />,
      className: 'text-right'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Inventory Command"
        description="Real-time oversight for Warehouse A-12"
        actions={
          <>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-high border border-outline hover:border-accent hover:text-accent transition-all font-label-caps text-label-caps text-[11px] rounded-clinical active:scale-95 text-on-surface-variant font-semibold">
              <Plus className="h-3.5 w-3.5 text-accent" />
              ADD STOCK
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-high border border-outline hover:border-accent hover:text-accent transition-all font-label-caps text-label-caps text-[11px] rounded-clinical active:scale-95 text-on-surface-variant font-semibold">
              <span className="material-symbols-outlined text-sm text-accent leading-none">picture_as_pdf</span>
              EXPORT PDF
            </button>
          </>
        }
      />

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger">
        <KPICard
          title="Total Stock Value"
          value="₹24.8M"
          trend="+4.2%"
          trendType="positive"
          type="progress"
          progressValue={72}
        />
        <KPICard
          title="Today's Purchases"
          value="114"
          subtitle="Units"
          type="sparkline"
        />
        <KPICard
          title="Expiring Soon"
          value="42"
          subtitle="SKUs < 30d"
          type="alert"
          badgeText="Action Required"
          extraInfo="Value Risk: ₹420k"
          trendType="negative"
        />
        <KPICard
          title="Active SKUs"
          value="1,894"
          trend="Optimal"
          trendType="positive"
          type="avatars"
        />
      </div>

      {/* Primary line chart */}
      <div className="w-full">
        <PurchaseTrendChart />
      </div>

      {/* Bento grid widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopProductsChart />
        <ExpiryDonutChart />
      </div>

      {/* Recent Movements Log */}
      <div className="bg-surface-container clinical-border shadow-clinical rounded-clinical overflow-hidden animate-fade-in-up">
        <div className="px-6 py-5 border-b border-outline-variant/60 flex justify-between items-center bg-surface-container-low/30">
          <h3 className="font-headline-md text-headline-md text-on-surface">Recent Inventory Movements</h3>
          <Link
            href="/purchases"
            className="text-primary font-label-caps text-label-caps text-[11px] font-semibold flex items-center gap-1 hover:underline transition-all"
          >
            VIEW ALL <ArrowRight className="h-3.5 w-3.5 stroke-[2.5px]" />
          </Link>
        </div>
        <div className="p-1">
          <DataTable columns={columns} data={recentMovements} />
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => console.log('Floating action clicked')}
        className="fixed bottom-8 right-8 w-14 h-14 bg-accent-gradient text-on-primary-container rounded-full flex items-center justify-center shadow-accent-glow hover:scale-110 hover:shadow-clinical-lg active:scale-95 transition-all duration-300 ease-smooth z-40 group border border-primary/20"
        title="Quick Replenish"
      >
        <span className="material-symbols-outlined text-[28px] font-semibold">add</span>
        <div className="absolute right-full mr-4 bg-surface-container border border-outline px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap rounded-clinical shadow-lg">
          <span className="font-label-caps text-label-caps text-on-surface text-[10px] uppercase font-bold tracking-wider">QUICK REPLENISH</span>
        </div>
      </button>
    </div>
  );
}
