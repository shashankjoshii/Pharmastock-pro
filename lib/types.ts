export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  batchNo: string;
  unit: string;
  stock: number;
  reorderLevel: number;
}

export interface Purchase {
  id: string;
  date: string;
  invoiceNo: string;
  vendorId: string;
  productId: string;
  qty: number;
  rate: number;
  total: number;
}

export interface Vendor {
  id: string;
  name: string;
  city?: string;
  contact?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  creditLimit?: number;
  performanceScore?: number; // percentage out of 100
  accreditation?: string[];
}

export interface ExpiryBatch {
  id: string;
  productId: string;
  batchNo: string;
  expiryDate: string;
  daysLeft: number;
  daysRemaining?: number;
  qty: number;
  status: 'expired' | 'critical' | 'warning' | 'safe'; // color-coded status helper
  quarantined?: boolean;
}

export interface Notification {
  id: string;
  type: 'expiry' | 'stock' | 'vendor' | 'system';
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
}
