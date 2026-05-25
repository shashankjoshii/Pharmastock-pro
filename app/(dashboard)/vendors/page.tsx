'use client';

import * as React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import DataTable from '@/components/shared/DataTable';
import ExportButtons from '@/components/shared/ExportButtons';
import { MOCK_VENDORS } from '@/lib/constants';
import { Vendor } from '@/lib/types';
import { useDebounce } from '@/hooks/useDebounce';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/Dialog';
import { Plus, Check, ShieldCheck, Mail, Phone, User as UserIcon } from 'lucide-react';

export default function VendorManagementPage() {
  const [vendors, setVendors] = React.useState<Vendor[]>(MOCK_VENDORS);
  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearch = useDebounce(searchTerm, 250);

  // Add Vendor Modal states
  const [addOpen, setAddOpen] = React.useState(false);
  const [newVendorName, setNewVendorName] = React.useState('');
  const [newContact, setNewContact] = React.useState('');
  const [newEmail, setNewEmail] = React.useState('');
  const [newPhone, setNewPhone] = React.useState('');
  const [certFDA, setCertFDA] = React.useState(true);
  const [certGMP, setCertGMP] = React.useState(true);

  // Handle addition
  const handleAddVendorSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const certs = [];
    if (certFDA) certs.push('FDA Approved');
    if (certGMP) certs.push('GMP Certified');

    const newVendor: Vendor = {
      id: `v${vendors.length + 1}`,
      name: newVendorName,
      contactPerson: newContact,
      email: newEmail,
      phone: newPhone,
      accreditation: certs
    };

    setVendors(prev => [...prev, newVendor]);
    console.log('New vendor added successfully:', newVendor);

    // Reset fields
    setAddOpen(false);
    setNewVendorName('');
    setNewContact('');
    setNewEmail('');
    setNewPhone('');
    setCertFDA(true);
    setCertGMP(true);
  };

  // Filter vendors
  const filteredVendors = React.useMemo(() => {
    return vendors.filter(v => {
      return (
        v.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        (v.contactPerson || '').toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        (v.email || '').toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    });
  }, [vendors, debouncedSearch]);

  const columns = [
    {
      header: 'SUPPLIER NAME',
      accessor: (row: Vendor) => (
        <span className="text-on-surface font-semibold">{row.name}</span>
      ),
      className: 'w-[200px]'
    },
    {
      header: 'CONTACT PERSON',
      accessor: (row: Vendor) => (
        <span className="text-on-surface-variant font-medium flex items-center gap-1.5">
          <UserIcon className="h-3.5 w-3.5 text-accent flex-shrink-0" />
          {row.contactPerson}
        </span>
      )
    },
    {
      header: 'EMAIL ADDRESS',
      accessor: (row: Vendor) => (
        <span className="text-text-muted flex items-center gap-1.5">
          <Mail className="h-3.5 w-3.5 text-text-muted/65 flex-shrink-0" />
          {row.email}
        </span>
      )
    },
    {
      header: 'PHONE NUMBER',
      accessor: (row: Vendor) => (
        <span className="text-text-muted flex items-center gap-1.5">
          <Phone className="h-3.5 w-3.5 text-text-muted/65 flex-shrink-0" />
          {row.phone}
        </span>
      ),
      className: 'w-[150px]'
    },
    {
      header: 'ACCREDITATIONS',
      accessor: (row: Vendor) => (
        <div className="flex flex-wrap gap-1.5">
          {(row.accreditation || []).map((badge, idx) => {
            const isFDA = badge.includes('FDA');
            return (
              <span
                key={idx}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[9px] font-bold font-mono-data tracking-wide uppercase ${
                  isFDA
                    ? 'bg-primary/10 text-primary border-primary/20'
                    : 'bg-success/10 text-success border-success/20'
                }`}
              >
                <ShieldCheck className="h-3 w-3 flex-shrink-0" />
                {badge}
              </span>
            );
          })}
        </div>
      ),
      className: 'w-[240px]'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Vendor Directories"
        description="Verify accreditation, contact coordinates, and log licensed pharmaceutical distributors."
        actions={
          <>
            <button
              onClick={() => setAddOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary-container hover:opacity-90 active:scale-95 transition-all font-label-caps text-label-caps text-[11px] rounded-clinical text-on-primary font-bold shadow-[0_0_12px_rgba(0,194,168,0.2)]"
            >
              <Plus className="h-4 w-4" />
              ADD SUPPLIER
            </button>
            <ExportButtons />
          </>
        }
      />

      {/* Filter Row */}
      <div className="relative bg-surface-container p-4 clinical-border rounded-clinical">
        <span className="material-symbols-outlined absolute left-7 top-1/2 -translate-y-1/2 text-on-surface-variant/70 text-sm">
          search
        </span>
        <input
          type="text"
          className="bg-background border border-outline focus:border-accent text-on-surface w-full h-10 pl-10 pr-4 rounded-clinical font-mono-data focus:ring-0 focus:outline-none placeholder-on-surface-variant/30 text-sm"
          placeholder="Search by Vendor Name, Contact, or Email Address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Vendors Table */}
      <div className="bg-surface-container p-1 clinical-border rounded-clinical">
        <DataTable
          columns={columns}
          data={filteredVendors}
          emptyMessage="No suppliers matched the search criteria."
        />
      </div>

      {/* Add Vendor Modal */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Register Licensed Supplier</DialogTitle>
            <DialogDescription>
              Submit contact parameters and regulatory details to authorize a supplier.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddVendorSubmit} className="space-y-4 pt-2">
            {/* Vendor Name */}
            <div className="space-y-1.5">
              <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase text-[10px]" htmlFor="vend-name">
                Supplier Corporation Name *
              </label>
              <input
                id="vend-name"
                type="text"
                required
                placeholder="e.g. Cipla Pharma Logistics"
                value={newVendorName}
                onChange={(e) => setNewVendorName(e.target.value)}
                className="bg-surface-container-low border border-outline focus:border-accent text-on-surface w-full h-10 px-3 rounded-clinical font-mono-data focus:ring-0 focus:outline-none text-sm"
              />
            </div>

            {/* Contact Person */}
            <div className="space-y-1.5">
              <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase text-[10px]" htmlFor="contact">
                Contact Person Name *
              </label>
              <input
                id="contact"
                type="text"
                required
                placeholder="e.g. Dr. Rajesh Sharma"
                value={newContact}
                onChange={(e) => setNewContact(e.target.value)}
                className="bg-surface-container-low border border-outline focus:border-accent text-on-surface w-full h-10 px-3 rounded-clinical font-mono-data focus:ring-0 focus:outline-none text-sm"
              />
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase text-[10px]" htmlFor="email">
                  Email Coordinates
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="contact@supplier.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="bg-surface-container-low border border-outline focus:border-accent text-on-surface w-full h-10 px-3 rounded-clinical font-mono-data focus:ring-0 focus:outline-none text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase text-[10px]" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="text"
                  required
                  placeholder="+91 98765 43210"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="bg-surface-container-low border border-outline focus:border-accent text-on-surface w-full h-10 px-3 rounded-clinical font-mono-data focus:ring-0 focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* Certifications checkboxes */}
            <div className="space-y-1.5 pt-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase text-[10px]">
                Accreditation & Approvals
              </label>
              <div className="flex gap-6 mt-1.5">
                <label className="flex items-center gap-2 cursor-pointer text-body-sm text-on-surface-variant">
                  <input
                    type="checkbox"
                    checked={certFDA}
                    onChange={(e) => setCertFDA(e.target.checked)}
                    className="rounded border-outline bg-surface-container-low text-primary focus:ring-0"
                  />
                  <span>FDA Approval Badge</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-body-sm text-on-surface-variant">
                  <input
                    type="checkbox"
                    checked={certGMP}
                    onChange={(e) => setCertGMP(e.target.checked)}
                    className="rounded border-outline bg-surface-container-low text-primary focus:ring-0"
                  />
                  <span>GMP Quality Certification</span>
                </label>
              </div>
            </div>

            <DialogFooter className="mt-6">
              <button
                type="button"
                onClick={() => setAddOpen(false)}
                className="px-4 py-2 border border-outline hover:border-accent hover:text-accent font-label-caps text-label-caps rounded-clinical text-[10px] font-semibold text-on-surface-variant bg-surface-container-low transition-colors"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-on-primary-container hover:opacity-90 active:scale-95 font-label-caps text-label-caps rounded-clinical text-[10px] font-semibold transition-all"
              >
                AUTHORIZE SUPPLIER
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
