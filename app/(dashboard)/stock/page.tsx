'use client';

import * as React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import DataTable from '@/components/shared/DataTable';
import StatusBadge from '@/components/shared/StatusBadge';
import ExportButtons from '@/components/shared/ExportButtons';
import { MOCK_PRODUCTS } from '@/lib/constants';
import { Product } from '@/lib/types';
import { useDebounce } from '@/hooks/useDebounce';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/Dialog';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/Select';
import { AlertTriangle, Plus, Minus, Settings, RotateCcw } from 'lucide-react';

export default function StockManagementPage() {
  const [products, setProducts] = React.useState<Product[]>(MOCK_PRODUCTS);
  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearch = useDebounce(searchTerm, 250);
  const [filterLowStock, setFilterLowStock] = React.useState(false);

  // Stock adjustment modal state
  const [adjustProduct, setAdjustProduct] = React.useState<Product | null>(null);
  const [adjustOpen, setAdjustOpen] = React.useState(false);
  const [adjustType, setAdjustType] = React.useState<'add' | 'remove'>('add');
  const [adjustQty, setAdjustQty] = React.useState(100);
  const [reason, setReason] = React.useState('Audit Adjustment');

  // Identify low stock products
  const lowStockProducts = React.useMemo(() => {
    return products.filter(p => p.stock <= p.reorderLevel);
  }, [products]);

  // Filtered products list
  const filteredProducts = React.useMemo(() => {
    return products.filter(prod => {
      const matchesSearch =
        prod.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        prod.sku.toLowerCase().includes(debouncedSearch.toLowerCase());
      
      const matchesLowStock = !filterLowStock || prod.stock <= prod.reorderLevel;

      return matchesSearch && matchesLowStock;
    });
  }, [products, debouncedSearch, filterLowStock]);

  const handleAdjustStockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustProduct) return;

    const change = adjustType === 'add' ? adjustQty : -adjustQty;

    setProducts(prev =>
      prev.map(p => {
        if (p.id === adjustProduct.id) {
          const newStock = Math.max(0, p.stock + change);
          return { ...p, stock: newStock };
        }
        return p;
      })
    );

    console.log(`Stock adjusted for ${adjustProduct.name}: ${change} units due to "${reason}"`);
    setAdjustOpen(false);
    setAdjustProduct(null);
    setAdjustQty(100);
    setReason('Audit Adjustment');
  };

  const columns = [
    { header: 'SKU CODE', accessor: 'sku' as keyof Product, className: 'w-[140px]' },
    {
      header: 'PRODUCT NAME',
      accessor: (row: Product) => (
        <span className="text-on-surface font-semibold">{row.name}</span>
      )
    },
    { header: 'CATEGORY', accessor: 'category' as keyof Product },
    {
      header: 'ACTIVE STOCK',
      accessor: (row: Product) => (
        <span className="font-semibold text-on-surface">{row.stock.toLocaleString()} units</span>
      )
    },
    {
      header: 'REORDER THRESHOLD',
      accessor: (row: Product) => (
        <span className="text-text-muted">{row.reorderLevel.toLocaleString()} units</span>
      )
    },
    {
      header: 'LOGISTICS STATUS',
      accessor: (row: Product) => {
        let status = 'in_stock';
        if (row.stock === 0) status = 'out_of_stock';
        else if (row.stock <= row.reorderLevel) status = 'low_stock';
        return <StatusBadge status={status} />;
      }
    },
    {
      header: 'ACTION',
      accessor: (row: Product) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setAdjustProduct(row);
            setAdjustOpen(true);
          }}
          className="flex items-center gap-1.5 px-3 py-1 bg-surface-container-high border border-outline hover:border-accent hover:text-accent font-label-caps text-label-caps text-[9px] rounded-clinical active:scale-95 transition-all text-on-surface-variant font-bold"
        >
          <Settings className="h-3 w-3 text-accent" />
          ADJUST
        </button>
      ),
      className: 'text-right w-[110px]'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Stock Management"
        description="Verify inventory tallies, adjust clinical batches, and check safety levels."
        actions={<ExportButtons />}
      />

      {/* Low Stock Urgent Notification Box */}
      {lowStockProducts.length > 0 && (
        <div className="bg-warning/5 border border-warning/20 p-4 rounded-clinical flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-headline-md text-sm text-warning font-semibold">Low Stock Threshold Warnings</h4>
              <p className="text-body-sm text-on-surface-variant/80 text-xs mt-0.5">
                There are {lowStockProducts.length} medicines operating below their configured safety reorder thresholds. Immediate replenishment is advised.
              </p>
            </div>
          </div>
          <button
            onClick={() => setFilterLowStock(!filterLowStock)}
            className={`px-4 py-2 border font-label-caps text-label-caps text-[10px] font-bold rounded-clinical active:scale-95 transition-all whitespace-nowrap ${
              filterLowStock
                ? 'bg-warning text-background border-warning'
                : 'bg-surface-container-high border-outline text-warning hover:border-warning'
            }`}
          >
            {filterLowStock ? 'SHOW ALL SKUS' : 'FILTER LOW STOCK'}
          </button>
        </div>
      )}

      {/* Filter Options Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-surface-container p-4 clinical-border rounded-clinical">
        {/* Search input */}
        <div className="relative md:col-span-3">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/70 text-sm">
            search
          </span>
          <input
            type="text"
            className="bg-background border border-outline focus:border-accent text-on-surface w-full h-10 pl-10 pr-4 rounded-clinical font-mono-data text-mono-data focus:ring-0 focus:outline-none placeholder-on-surface-variant/30 text-sm"
            placeholder="Search by SKU or Medicine Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Toggle Filter checkbox equivalent */}
        <button
          onClick={() => setFilterLowStock(!filterLowStock)}
          className={`flex items-center justify-center gap-2 h-10 border rounded-clinical font-label-caps text-label-caps text-[10px] font-bold transition-all ${
            filterLowStock
              ? 'bg-warning/15 border-warning text-warning'
              : 'bg-surface-container-low border-outline text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[16px] leading-none">warning</span>
          LOW STOCK ONLY
        </button>
      </div>

      {/* Products Table container */}
      <div className="bg-surface-container p-1 clinical-border rounded-clinical">
        <DataTable
          columns={columns}
          data={filteredProducts}
          emptyMessage="No medicines fit the stock filters."
        />
      </div>

      {/* Stock Adjustment Dialog */}
      <Dialog open={adjustOpen} onOpenChange={setAdjustOpen}>
        <DialogContent className="max-w-[460px]">
          <DialogHeader>
            <DialogTitle>Stock Count Adjustment</DialogTitle>
            <DialogDescription>
              Perform an audited adjustment to the physical inventory counts.
            </DialogDescription>
          </DialogHeader>

          {adjustProduct && (
            <form onSubmit={handleAdjustStockSubmit} className="space-y-4 pt-2">
              <div className="border-b border-outline-variant/40 pb-3">
                <span className="font-label-caps text-[9px] text-text-muted uppercase block">Selected SKU</span>
                <span className="text-body-sm font-semibold text-on-surface block mt-1">{adjustProduct.name}</span>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-[11px] text-on-surface-variant">Active Stock: <strong>{adjustProduct.stock.toLocaleString()} units</strong></span>
                  <span className="text-[11px] text-on-surface-variant">Reorder Level: {adjustProduct.reorderLevel.toLocaleString()} units</span>
                </div>
              </div>

              {/* Adjustment direction */}
              <div className="space-y-1.5">
                <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase text-[10px]">
                  Adjustment Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAdjustType('add')}
                    className={`flex items-center justify-center gap-2 h-10 border rounded-clinical font-label-caps text-label-caps text-[10px] font-bold transition-all ${
                      adjustType === 'add'
                        ? 'bg-primary/10 border-primary text-primary'
                        : 'bg-surface-container-low border-outline text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    ADD INVENTORY
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdjustType('remove')}
                    className={`flex items-center justify-center gap-2 h-10 border rounded-clinical font-label-caps text-label-caps text-[10px] font-bold transition-all ${
                      adjustType === 'remove'
                        ? 'bg-danger/10 border-danger text-danger'
                        : 'bg-surface-container-low border-outline text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <Minus className="h-3.5 w-3.5" />
                    REMOVE INVENTORY
                  </button>
                </div>
              </div>

              {/* Adjustment quantity */}
              <div className="space-y-1.5">
                <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase text-[10px]" htmlFor="adjust-qty">
                  Quantity
                </label>
                <input
                  id="adjust-qty"
                  type="number"
                  min="1"
                  value={adjustQty}
                  onChange={(e) => setAdjustQty(parseInt(e.target.value) || 0)}
                  className="bg-surface-container-low border border-outline focus:border-accent text-on-surface w-full h-10 px-3 rounded-clinical font-mono-data focus:ring-0 focus:outline-none text-sm"
                />
              </div>

              {/* Adjustment reason select */}
              <div className="space-y-1.5">
                <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase text-[10px]">
                  Reason Code
                </label>
                <Select value={reason} onValueChange={setReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason code..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Audit Adjustment">Audit Verification Tally</SelectItem>
                    <SelectItem value="Damaged Goods">Quarantine / Damaged Goods</SelectItem>
                    <SelectItem value="Clinical Dispensation">Internal Clinical Dispensation</SelectItem>
                    <SelectItem value="Restock Refurbish">Restocked / Returns</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter className="mt-6">
                <button
                  type="button"
                  onClick={() => setAdjustOpen(false)}
                  className="px-4 py-2 border border-outline hover:border-accent hover:text-accent font-label-caps text-label-caps rounded-clinical text-[10px] font-semibold text-on-surface-variant bg-surface-container-low transition-colors"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-on-primary-container hover:opacity-90 active:scale-95 font-label-caps text-label-caps rounded-clinical text-[10px] font-semibold transition-all"
                >
                  CONFIRM ADJUSTMENT
                </button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
