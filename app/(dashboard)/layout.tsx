'use client';

import * as React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Topnav from '@/components/layout/Topnav';
import { useNotifications } from '@/hooks/useNotifications';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/Dialog';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/Select';
import { MOCK_PRODUCTS, MOCK_VENDORS } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const { unreadCount } = useNotifications();

  // Global Dialog state for New Purchase
  const [newPurchaseOpen, setNewPurchaseOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState('');
  const [selectedVendor, setSelectedVendor] = React.useState('');
  const [quantity, setQuantity] = React.useState(100);
  const [rate, setRate] = React.useState(10);
  
  const productObj = MOCK_PRODUCTS.find(p => p.id === selectedProduct);
  const totalCost = quantity * (productObj ? rate : 0);

  const handleCreatePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Purchase record created:', {
      product: selectedProduct,
      vendor: selectedVendor,
      qty: quantity,
      rate,
      total: totalCost
    });
    setNewPurchaseOpen(false);
    // Reset state
    setSelectedProduct('');
    setSelectedVendor('');
    setQuantity(100);
    setRate(10);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0D0F14] text-[#F0F2F6]">
      {/* Sidebar navigation */}
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* Main content display column */}
      <div className="flex-1 flex flex-col min-w-0 relative overflow-hidden">
        <Topnav
          setMobileOpen={setMobileSidebarOpen}
          unreadNotifications={unreadCount}
          onNewPurchaseClick={() => setNewPurchaseOpen(true)}
        />

        {/* Content body wrapper */}
        <main className="flex-1 overflow-y-auto grid-bg p-6 md:p-8 relative">
          {children}
        </main>
      </div>

      {/* Global New Purchase Modal */}
      <Dialog open={newPurchaseOpen} onOpenChange={setNewPurchaseOpen}>
        <DialogContent className="max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Register New Purchase</DialogTitle>
            <DialogDescription>
              Create a new transaction invoice in the centralized inventory registry.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreatePurchase} className="space-y-4 pt-2">
            {/* Product selection */}
            <div className="space-y-1.5">
              <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase text-[10px]">
                Product *
              </label>
              <Select value={selectedProduct} onValueChange={(val) => {
                setSelectedProduct(val);
                const prod = MOCK_PRODUCTS.find(p => p.id === val);
                if (prod) {
                  // Pre-fill a realistic rate
                  if (val === 'p1') setRate(8.5);
                  else if (val === 'p2') setRate(45.0);
                  else if (val === 'p3') setRate(850.0);
                  else if (val === 'p4') setRate(12.0);
                  else setRate(25.0);
                }
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select inventory SKU..." />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_PRODUCTS.map((prod) => (
                    <SelectItem key={prod.id} value={prod.id}>
                      {prod.name} ({prod.sku})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Vendor selection */}
            <div className="space-y-1.5">
              <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase text-[10px]">
                Supplier Vendor *
              </label>
              <Select value={selectedVendor} onValueChange={setSelectedVendor}>
                <SelectTrigger>
                  <SelectValue placeholder="Select accredited supplier..." />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_VENDORS.map((vend) => (
                    <SelectItem key={vend.id} value={vend.id}>
                      {vend.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity and Rate row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase text-[10px]" htmlFor="qty">
                  Quantity
                </label>
                <input
                  id="qty"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                  className="bg-surface-container-low border border-outline focus:border-accent text-on-surface w-full h-10 px-3 rounded-clinical font-mono-data focus:ring-0 focus:outline-none text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase text-[10px]" htmlFor="rate">
                  Rate (per unit)
                </label>
                <input
                  id="rate"
                  type="number"
                  step="0.01"
                  min="0.1"
                  value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
                  className="bg-surface-container-low border border-outline focus:border-accent text-on-surface w-full h-10 px-3 rounded-clinical font-mono-data focus:ring-0 focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* Cost breakdown summary */}
            <div className="bg-background border border-outline/50 p-4 rounded-clinical flex justify-between items-center mt-2">
              <span className="font-label-caps text-label-caps text-on-surface-variant text-[10px] uppercase">
                Est. Transaction Cost
              </span>
              <span className="font-kpi-numeric text-lg font-bold text-primary">
                {formatCurrency(totalCost)}
              </span>
            </div>

            <DialogFooter className="mt-6">
              <button
                type="button"
                onClick={() => setNewPurchaseOpen(false)}
                className="px-4 py-2 border border-outline hover:border-accent hover:text-accent font-label-caps text-label-caps rounded-clinical text-[10px] font-semibold text-on-surface-variant bg-surface-container-low transition-colors"
              >
                CANCEL
              </button>
              <button
                type="submit"
                disabled={!selectedProduct || !selectedVendor}
                className="px-4 py-2 bg-primary text-on-primary-container hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:pointer-events-none font-label-caps text-label-caps rounded-clinical text-[10px] font-semibold transition-all"
              >
                CONFIRM ACQUISITION
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
