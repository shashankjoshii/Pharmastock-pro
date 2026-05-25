'use client';

import * as React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import DataTable from '@/components/shared/DataTable';
import ExportButtons from '@/components/shared/ExportButtons';
import { MOCK_PURCHASES, MOCK_PRODUCTS, MOCK_VENDORS } from '@/lib/constants';
import { Purchase } from '@/lib/types';
import { usePagination } from '@/hooks/usePagination';
import { useDebounce } from '@/hooks/useDebounce';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/Popover';
import { Calendar } from '@/components/ui/Calendar';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/Select';
import { Calendar as CalendarIcon, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PurchasesPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearch = useDebounce(searchTerm, 250);
  const [selectedVendor, setSelectedVendor] = React.useState('All');
  
  // Date filter states
  const [startDate, setStartDate] = React.useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = React.useState<Date | undefined>(undefined);

  // Clear filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedVendor('All');
    setStartDate(undefined);
    setEndDate(undefined);
  };

  // Filter purchases
  const filteredPurchases = React.useMemo(() => {
    return MOCK_PURCHASES.filter(purchase => {
      // Lookup product and vendor details
      const productObj = MOCK_PRODUCTS.find(p => p.id === purchase.productId);
      const vendorObj = MOCK_VENDORS.find(v => v.id === purchase.vendorId);
      
      const productName = productObj ? productObj.name : '';
      const vendorName = vendorObj ? vendorObj.name : '';
      
      const matchesSearch =
        productName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        purchase.invoiceNo.toLowerCase().includes(debouncedSearch.toLowerCase());
      
      const matchesVendor =
        selectedVendor === 'All' || purchase.vendorId === selectedVendor;

      // Date logic
      const pDate = new Date(purchase.date);
      let matchesStartDate = true;
      let matchesEndDate = true;

      if (startDate) {
        // Set hours to 0 to compare dates cleanly
        const sDate = new Date(startDate);
        sDate.setHours(0, 0, 0, 0);
        pDate.setHours(0, 0, 0, 0);
        matchesStartDate = pDate >= sDate;
      }
      if (endDate) {
        const eDate = new Date(endDate);
        eDate.setHours(23, 59, 59, 999);
        matchesEndDate = pDate <= eDate;
      }

      return matchesSearch && matchesVendor && matchesStartDate && matchesEndDate;
    });
  }, [debouncedSearch, selectedVendor, startDate, endDate]);

  // Hook pagination
  const {
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
    totalRecords,
    paginatedData,
    startRecord,
    endRecord,
    nextPage,
    prevPage,
    hasPrev,
    hasNext
  } = usePagination<Purchase>({
    data: filteredPurchases,
    initialPageSize: 10
  });

  const columns = [
    {
      header: 'DATE',
      accessor: (row: Purchase) => (
        <span className="font-semibold text-on-surface">{formatDate(row.date)}</span>
      ),
      className: 'w-[120px]'
    },
    { header: 'INVOICE NO', accessor: 'invoiceNo' as keyof Purchase, className: 'font-semibold' },
    {
      header: 'VENDOR',
      accessor: (row: Purchase) => {
        const vendor = MOCK_VENDORS.find(v => v.id === row.vendorId);
        return <span>{vendor ? vendor.name : 'Unknown Supplier'}</span>;
      }
    },
    {
      header: 'PRODUCT NAME',
      accessor: (row: Purchase) => {
        const product = MOCK_PRODUCTS.find(p => p.id === row.productId);
        return <span className="text-on-surface font-medium">{product ? product.name : 'Unknown SKU'}</span>;
      }
    },
    {
      header: 'QTY',
      accessor: (row: Purchase) => (
        <span className="text-on-surface">{row.qty.toLocaleString()} units</span>
      )
    },
    {
      header: 'RATE',
      accessor: (row: Purchase) => <span>{formatCurrency(row.rate)}</span>
    },
    {
      header: 'TOTAL VALUE',
      accessor: (row: Purchase) => (
        <span className="text-primary font-semibold">{formatCurrency(row.total)}</span>
      ),
      className: 'text-right'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Purchases Registry"
        description="Comprehensive audit ledger tracking all warehouse logistics and expenditures."
        actions={<ExportButtons />}
      />

      {/* Filters Toolbar */}
      <div className="flex flex-col xl:flex-row gap-4 bg-surface-container p-4 clinical-border rounded-clinical z-20 relative">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/70 text-sm">
            search
          </span>
          <input
            type="text"
            className="bg-background border border-outline focus:border-accent text-on-surface w-full h-10 pl-10 pr-4 rounded-clinical font-mono-data focus:ring-0 focus:outline-none placeholder-on-surface-variant/30 text-sm"
            placeholder="Search invoice or product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Vendor Select */}
        <div className="w-full sm:w-[220px]">
          <Select value={selectedVendor} onValueChange={setSelectedVendor}>
            <SelectTrigger>
              <SelectValue placeholder="All Vendors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Suppliers</SelectItem>
              {MOCK_VENDORS.map((v) => (
                <SelectItem key={v.id} value={v.id}>
                  {v.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date Start */}
        <div className="w-full sm:w-[170px]">
          <Popover>
            <PopoverTrigger className="flex h-10 w-full items-center justify-between border border-outline bg-surface-container-low px-3 py-2 text-body-sm text-on-surface rounded-clinical focus:outline-none focus:ring-1 focus:ring-accent">
              <span className="flex items-center gap-2 truncate text-on-surface-variant/80">
                <CalendarIcon className="h-4 w-4 text-accent flex-shrink-0" />
                {startDate ? startDate.toLocaleDateString('en-IN') : 'Start Date'}
              </span>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                selected={startDate}
                onSelect={setStartDate}
                mode="single"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Date End */}
        <div className="w-full sm:w-[170px]">
          <Popover>
            <PopoverTrigger className="flex h-10 w-full items-center justify-between border border-outline bg-surface-container-low px-3 py-2 text-body-sm text-on-surface rounded-clinical focus:outline-none focus:ring-1 focus:ring-accent">
              <span className="flex items-center gap-2 truncate text-on-surface-variant/80">
                <CalendarIcon className="h-4 w-4 text-accent flex-shrink-0" />
                {endDate ? endDate.toLocaleDateString('en-IN') : 'End Date'}
              </span>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                selected={endDate}
                onSelect={setEndDate}
                mode="single"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Reset */}
        <button
          onClick={handleResetFilters}
          className="h-10 px-4 border border-outline hover:border-accent hover:text-accent font-label-caps text-label-caps text-[10px] font-bold rounded-clinical bg-surface-container-low text-on-surface-variant flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          title="Reset Filters"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          RESET
        </button>
      </div>

      {/* DataTable Container */}
      <div className="bg-surface-container p-1 clinical-border rounded-clinical relative">
        <DataTable
          columns={columns}
          data={paginatedData}
          emptyMessage="No purchases matched the query credentials."
        />
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface-container p-4 border border-outline/70 rounded-clinical">
        {/* Record count indicator */}
        <span className="text-body-sm text-on-surface-variant/80 font-medium">
          Showing <strong className="text-on-surface">{startRecord}–{endRecord}</strong> of <strong className="text-on-surface">{totalRecords}</strong> records
        </span>

        <div className="flex flex-wrap items-center gap-4">
          {/* Page size selector */}
          <div className="flex items-center gap-2">
            <span className="text-body-sm text-on-surface-variant/60 font-semibold font-label-caps text-[10px] uppercase">
              Rows Per Page:
            </span>
            <div className="w-[80px]">
              <Select
                value={pageSize.toString()}
                onValueChange={(val) => {
                  setPageSize(parseInt(val));
                  setCurrentPage(1); // reset to page 1
                }}
              >
                <SelectTrigger className="h-8 py-0 bg-surface-container-low">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Page numbers navigation buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevPage}
              disabled={!hasPrev}
              className="p-1.5 border border-outline hover:border-accent hover:text-accent rounded-clinical text-on-surface-variant hover:bg-surface-container-low disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Previous Page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-body-sm font-semibold text-on-surface font-mono-data px-1">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={!hasNext}
              className="p-1.5 border border-outline hover:border-accent hover:text-accent rounded-clinical text-on-surface-variant hover:bg-surface-container-low disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Next Page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
