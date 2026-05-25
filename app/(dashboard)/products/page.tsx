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
import { Search, Filter, Info, Eye } from 'lucide-react';

export default function ProductMasterPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearch = useDebounce(searchTerm, 250);
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  
  // Selected product details modal
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [detailsOpen, setDetailsOpen] = React.useState(false);

  // Extract unique categories
  const categories = React.useMemo(() => {
    const list = new Set(MOCK_PRODUCTS.map(p => p.category));
    return ['All', ...Array.from(list)];
  }, []);

  // Filter products
  const filteredProducts = React.useMemo(() => {
    return MOCK_PRODUCTS.filter(prod => {
      const matchesSearch =
        prod.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        prod.sku.toLowerCase().includes(debouncedSearch.toLowerCase());
      
      const matchesCategory =
        selectedCategory === 'All' || prod.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [debouncedSearch, selectedCategory]);

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
      header: 'STOCK QUANTITY',
      accessor: (row: Product) => (
        <span className="font-semibold text-on-surface">{row.stock.toLocaleString()} units</span>
      )
    },
    {
      header: 'REORDER LEVEL',
      accessor: (row: Product) => (
        <span className="text-text-muted">{row.reorderLevel.toLocaleString()} units</span>
      )
    },
    {
      header: 'STOCK STATUS',
      accessor: (row: Product) => {
        let status = 'in_stock';
        if (row.stock === 0) status = 'out_of_stock';
        else if (row.stock <= row.reorderLevel) status = 'low_stock';
        return <StatusBadge status={status} />;
      }
    },
    {
      header: 'DETAILS',
      accessor: (row: Product) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProduct(row);
            setDetailsOpen(true);
          }}
          className="p-1 hover:text-accent text-on-surface-variant hover:bg-surface-container-high rounded transition-colors"
          title="View Details"
        >
          <Eye className="h-4 w-4" />
        </button>
      ),
      className: 'text-right w-[80px]'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Product Master"
        description="Core inventory directory for clinical SKUs and storage thresholds."
        actions={<ExportButtons />}
      />

      {/* Filter Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-surface-container p-4 clinical-border rounded-clinical">
        {/* Search input */}
        <div className="relative md:col-span-2">
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

        {/* Category selector */}
        <div className="flex items-center gap-2 md:col-span-2">
          <span className="material-symbols-outlined text-on-surface-variant text-sm flex-shrink-0">filter_alt</span>
          <div className="flex flex-wrap gap-1.5 w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-clinical text-[10px] font-bold font-label-caps border transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-background border-primary'
                    : 'bg-surface-container-low border-outline text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Table container */}
      <div className="bg-surface-container p-1 clinical-border rounded-clinical">
        <DataTable
          columns={columns}
          data={filteredProducts}
          onRowClick={(row) => {
            setSelectedProduct(row);
            setDetailsOpen(true);
          }}
          emptyMessage="No medicines match the selected filter query."
        />
      </div>

      {/* Product Details Modal */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-[480px]">
          <DialogHeader>
            <DialogTitle>SKU Logistics File</DialogTitle>
            <DialogDescription>
              Technical specifications and active inventory parameters.
            </DialogDescription>
          </DialogHeader>

          {selectedProduct && (
            <div className="space-y-4 pt-4">
              {/* Product header */}
              <div className="flex justify-between items-start border-b border-outline-variant/40 pb-4">
                <div>
                  <h4 className="font-headline-md text-primary">{selectedProduct.name}</h4>
                  <p className="font-mono-data text-[12px] text-text-muted mt-1">{selectedProduct.sku}</p>
                </div>
                <StatusBadge
                  status={
                    selectedProduct.stock === 0
                      ? 'out_of_stock'
                      : selectedProduct.stock <= selectedProduct.reorderLevel
                      ? 'low_stock'
                      : 'in_stock'
                  }
                />
              </div>

              {/* Data grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-container-low border border-outline/50 p-3 rounded-clinical">
                  <span className="font-label-caps text-label-caps text-on-surface-variant/80 text-[9px] uppercase block">
                    Product Category
                  </span>
                  <span className="text-body-sm font-semibold text-on-surface mt-1 block">
                    {selectedProduct.category}
                  </span>
                </div>

                <div className="bg-surface-container-low border border-outline/50 p-3 rounded-clinical">
                  <span className="font-label-caps text-label-caps text-on-surface-variant/80 text-[9px] uppercase block">
                    Measurement Unit
                  </span>
                  <span className="text-body-sm font-semibold text-on-surface mt-1 block">
                    {selectedProduct.unit}
                  </span>
                </div>

                <div className="bg-surface-container-low border border-outline/50 p-3 rounded-clinical">
                  <span className="font-label-caps text-label-caps text-on-surface-variant/80 text-[9px] uppercase block">
                    Default Batch No
                  </span>
                  <span className="text-body-sm font-semibold text-on-surface mt-1 block font-mono-data">
                    {selectedProduct.batchNo}
                  </span>
                </div>

                <div className="bg-surface-container-low border border-outline/50 p-3 rounded-clinical">
                  <span className="font-label-caps text-label-caps text-on-surface-variant/80 text-[9px] uppercase block">
                    Safety Threshold
                  </span>
                  <span className="text-body-sm font-semibold text-on-surface mt-1 block">
                    {selectedProduct.reorderLevel.toLocaleString()} units
                  </span>
                </div>
              </div>

              {/* Active stock highlight */}
              <div className="bg-background border border-outline/50 p-4 rounded-clinical flex justify-between items-center mt-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">warehouse</span>
                  <span className="font-label-caps text-label-caps text-on-surface-variant text-[10px] uppercase">
                    Active Stock Quantity
                  </span>
                </div>
                <span className="font-kpi-numeric text-lg font-bold text-on-surface">
                  {selectedProduct.stock.toLocaleString()} units
                </span>
              </div>
            </div>
          )}

          <DialogFooter className="mt-6">
            <button
              onClick={() => setDetailsOpen(false)}
              className="w-full px-4 py-2 bg-primary text-on-primary-container hover:opacity-90 active:scale-95 font-label-caps text-label-caps rounded-clinical text-[10px] font-semibold transition-all uppercase tracking-wider"
            >
              DISMISS FILE
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
