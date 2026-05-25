import { Product, Vendor, Purchase, ExpiryBatch, Notification } from './types';

export const ROUTES = [
  { path: '/', label: 'Dashboard', icon: 'dashboard' },
  { path: '/products', label: 'Product Master', icon: 'inventory_2' },
  { path: '/stock', label: 'Stock Management', icon: 'warehouse' },
  { path: '/purchases', label: 'Purchases Registry', icon: 'shopping_cart' },
  { path: '/expiry', label: 'Expiry Tracker', icon: 'event_busy' },
  { path: '/vendors', label: 'Vendor Management', icon: 'local_shipping' },
  { path: '/reports', label: 'Reports & Exports', icon: 'assessment' },
  { path: '/notifications', label: 'Notifications', icon: 'notifications' },
  { path: '/settings', label: 'Settings', icon: 'settings' }
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', sku: 'SKU-AMX-500', name: 'AMOXICILLIN 500MG CAPSULE', category: 'Antibiotics', batchNo: 'AMX-2026-09', unit: 'Box of 100', stock: 12400, reorderLevel: 3000 },
  { id: 'p2', sku: 'SKU-PAR-SYR', name: 'PARACETAMOL 250MG SYRUP', category: 'Analgesics', batchNo: 'PAR-2026-12', unit: 'Bottle of 60ml', stock: 980, reorderLevel: 1000 },
  { id: 'p3', sku: 'SKU-INS-GLA', name: 'INSULIN GLARGINE 100 IU/ML', category: 'Antidiabetics', batchNo: 'INS-99081', unit: 'Vial of 10ml', stock: 745, reorderLevel: 200 },
  { id: 'p4', sku: 'SKU-MET-1000', name: 'METFORMIN HCL 1000MG', category: 'Antidiabetics', batchNo: 'MET-44123', unit: 'Box of 100', stock: 6100, reorderLevel: 1500 },
  { id: 'p5', sku: 'SKU-AZI-250', name: 'AZITHROMYCIN 250MG TABLET', category: 'Antibiotics', batchNo: 'AZI-55610', unit: 'Box of 60', stock: 540, reorderLevel: 500 },
  { id: 'p6', sku: 'SKU-CIP-500', name: 'CIPROFLOXACIN 500MG TABLET', category: 'Antibiotics', batchNo: 'CIP-2026-04', unit: 'Box of 100', stock: 4300, reorderLevel: 1000 },
  { id: 'p7', sku: 'SKU-ATOR-20', name: 'ATORVASTATIN 20MG TABLET', category: 'Cardiovascular', batchNo: 'ATOR-8811', unit: 'Box of 90', stock: 8500, reorderLevel: 2000 },
  { id: 'p8', sku: 'SKU-IBU-400', name: 'IBUPROFEN 400MG TABLET', category: 'Analgesics', batchNo: 'IBU-33291', unit: 'Box of 100', stock: 12000, reorderLevel: 2500 },
  { id: 'p9', sku: 'SKU-PAN-40', name: 'PANTOPRAZOLE 40MG TABLET', category: 'Gastrointestinal', batchNo: 'PAN-77612', unit: 'Box of 100', stock: 15400, reorderLevel: 3000 },
  { id: 'p10', sku: 'SKU-MON-10', name: 'MONTELUKAST 10MG TABLET', category: 'Respiratory', batchNo: 'MON-11204', unit: 'Box of 30', stock: 3200, reorderLevel: 1000 },
  { id: 'p11', sku: 'SKU-AML-5', name: 'AMLODIPINE 5MG TABLET', category: 'Cardiovascular', batchNo: 'AML-00981', unit: 'Box of 100', stock: 9800, reorderLevel: 2000 },
  { id: 'p12', sku: 'SKU-CET-10', name: 'CETIRIZINE 10MG TABLET', category: 'Antihistamines', batchNo: 'CET-66190', unit: 'Box of 100', stock: 1100, reorderLevel: 1500 },
  { id: 'p13', sku: 'SKU-VIT-D3', name: 'VITAMIN D3 60000 IU CHOLECALCIFEROL', category: 'Supplements', batchNo: 'VIT-5522', unit: 'Box of 40', stock: 2500, reorderLevel: 800 },
  { id: 'p14', sku: 'SKU-LOS-50', name: 'LOSARTAN POTASSIUM 50MG', category: 'Cardiovascular', batchNo: 'LOS-44321', unit: 'Box of 100', stock: 6700, reorderLevel: 1500 },
  { id: 'p15', sku: 'SKU-GAB-300', name: 'GABAPENTIN 300MG CAPSULE', category: 'Neurology', batchNo: 'GAB-88092', unit: 'Box of 100', stock: 1800, reorderLevel: 1000 }
];

export const MOCK_VENDORS: Vendor[] = [
  { id: 'v1', name: 'MedLife Pharma Distributors', city: 'Mumbai', contact: '+91 22 4567 8901', creditLimit: 2500000, performanceScore: 94 },
  { id: 'v2', name: 'Global Biotech Logistics', city: 'Bengaluru', contact: '+91 80 1234 5678', creditLimit: 5000000, performanceScore: 89 },
  { id: 'v3', name: 'Zenith Medical Supplies', city: 'Delhi', contact: '+91 11 9876 5432', creditLimit: 1500000, performanceScore: 78 },
  { id: 'v4', name: 'Cipla Trade Distributors', city: 'Hyderabad', contact: '+91 40 4455 6677', creditLimit: 8000000, performanceScore: 98 },
  { id: 'v5', name: 'Sun Pharma Logistics', city: 'Ahmedabad', contact: '+91 79 3344 5566', creditLimit: 6000000, performanceScore: 92 },
  { id: 'v6', name: 'Apex Healthcare Distribution', city: 'Chennai', contact: '+91 44 8877 6655', creditLimit: 3000000, performanceScore: 85 },
  { id: 'v7', name: 'Dr. Reddy\'s Logistics', city: 'Visakhapatnam', contact: '+91 891 2233 445', creditLimit: 4000000, performanceScore: 96 },
  { id: 'v8', name: 'Mankind Specialty Dist', city: 'Delhi', contact: '+91 11 5566 7788', creditLimit: 2000000, performanceScore: 82 }
];

// Generate 55 realistic purchase rows spread across April-May 2026.
// Let's programmatically construct them so they are clean, typed and have realistic quantities/prices.
const basePurchases: Partial<Purchase>[] = [
  { id: 'TXN-001', date: '2026-05-24', invoiceNo: 'INV-2026-901', vendorId: 'v1', productId: 'p1', qty: 2500, rate: 8.5 },
  { id: 'TXN-002', date: '2026-05-24', invoiceNo: 'INV-2026-902', vendorId: 'v2', productId: 'p2', qty: 150, rate: 45.0 },
  { id: 'TXN-003', date: '2026-05-23', invoiceNo: 'INV-2026-903', vendorId: 'v3', productId: 'p3', qty: 50, rate: 850.0 },
  { id: 'TXN-004', date: '2026-05-22', invoiceNo: 'INV-2026-904', vendorId: 'v4', productId: 'p4', qty: 1200, rate: 12.0 },
  { id: 'TXN-005', date: '2026-05-22', invoiceNo: 'INV-2026-905', vendorId: 'v5', productId: 'p5', qty: 200, rate: 35.0 },
  { id: 'TXN-006', date: '2026-05-21', invoiceNo: 'INV-2026-906', vendorId: 'v6', productId: 'p6', qty: 1000, rate: 15.0 },
  { id: 'TXN-007', date: '2026-05-20', invoiceNo: 'INV-2026-907', vendorId: 'v7', productId: 'p7', qty: 3000, rate: 6.2 },
  { id: 'TXN-008', date: '2026-05-19', invoiceNo: 'INV-2026-908', vendorId: 'v8', productId: 'p8', qty: 4000, rate: 4.5 },
  { id: 'TXN-009', date: '2026-05-18', invoiceNo: 'INV-2026-909', vendorId: 'v1', productId: 'p9', qty: 5000, rate: 7.0 },
  { id: 'TXN-010', date: '2026-05-17', invoiceNo: 'INV-2026-910', vendorId: 'v2', productId: 'p10', qty: 500, rate: 22.0 },
  { id: 'TXN-011', date: '2026-05-16', invoiceNo: 'INV-2026-911', vendorId: 'v3', productId: 'p11', qty: 2000, rate: 5.0 },
  { id: 'TXN-012', date: '2026-05-15', invoiceNo: 'INV-2026-912', vendorId: 'v4', productId: 'p12', qty: 800, rate: 8.0 },
  { id: 'TXN-013', date: '2026-05-14', invoiceNo: 'INV-2026-913', vendorId: 'v5', productId: 'p13', qty: 1000, rate: 18.0 },
  { id: 'TXN-014', date: '2026-05-13', invoiceNo: 'INV-2026-914', vendorId: 'v6', productId: 'p14', qty: 1500, rate: 11.5 },
  { id: 'TXN-015', date: '2026-05-12', invoiceNo: 'INV-2026-915', vendorId: 'v7', productId: 'p15', qty: 400, rate: 95.0 },
  { id: 'TXN-016', date: '2026-05-11', invoiceNo: 'INV-2026-916', vendorId: 'v8', productId: 'p1', qty: 2000, rate: 8.4 },
  { id: 'TXN-017', date: '2026-05-10', invoiceNo: 'INV-2026-917', vendorId: 'v1', productId: 'p2', qty: 300, rate: 44.0 },
  { id: 'TXN-018', date: '2026-05-09', invoiceNo: 'INV-2026-918', vendorId: 'v2', productId: 'p3', qty: 80, rate: 840.0 },
  { id: 'TXN-019', date: '2026-05-08', invoiceNo: 'INV-2026-919', vendorId: 'v3', productId: 'p4', qty: 1500, rate: 12.1 },
  { id: 'TXN-020', date: '2026-05-07', invoiceNo: 'INV-2026-920', vendorId: 'v4', productId: 'p5', qty: 300, rate: 34.5 },
  { id: 'TXN-021', date: '2026-05-06', invoiceNo: 'INV-2026-921', vendorId: 'v5', productId: 'p6', qty: 1200, rate: 14.8 },
  { id: 'TXN-022', date: '2026-05-05', invoiceNo: 'INV-2026-922', vendorId: 'v6', productId: 'p7', qty: 2500, rate: 6.3 },
  { id: 'TXN-023', date: '2026-05-04', invoiceNo: 'INV-2026-923', vendorId: 'v7', productId: 'p8', qty: 3500, rate: 4.6 },
  { id: 'TXN-024', date: '2026-05-03', invoiceNo: 'INV-2026-924', vendorId: 'v8', productId: 'p9', qty: 4500, rate: 6.9 },
  { id: 'TXN-025', date: '2026-05-02', invoiceNo: 'INV-2026-925', vendorId: 'v1', productId: 'p10', qty: 600, rate: 21.5 },
  { id: 'TXN-026', date: '2026-05-01', invoiceNo: 'INV-2026-926', vendorId: 'v2', productId: 'p11', qty: 1800, rate: 4.95 },
  { id: 'TXN-027', date: '2026-04-30', invoiceNo: 'INV-2026-927', vendorId: 'v3', productId: 'p12', qty: 900, rate: 7.9 },
  { id: 'TXN-028', date: '2026-04-29', invoiceNo: 'INV-2026-928', vendorId: 'v4', productId: 'p13', qty: 1200, rate: 17.5 },
  { id: 'TXN-029', date: '2026-04-28', invoiceNo: 'INV-2026-929', vendorId: 'v5', productId: 'p14', qty: 1600, rate: 11.2 },
  { id: 'TXN-030', date: '2026-04-27', invoiceNo: 'INV-2026-930', vendorId: 'v6', productId: 'p15', qty: 500, rate: 94.0 },
  { id: 'TXN-031', date: '2026-04-26', invoiceNo: 'INV-2026-931', vendorId: 'v7', productId: 'p1', qty: 3000, rate: 8.35 },
  { id: 'TXN-032', date: '2026-04-25', invoiceNo: 'INV-2026-932', vendorId: 'v8', productId: 'p2', qty: 250, rate: 45.5 },
  { id: 'TXN-033', date: '2026-04-24', invoiceNo: 'INV-2026-933', vendorId: 'v1', productId: 'p3', qty: 100, rate: 855.0 },
  { id: 'TXN-034', date: '2026-04-23', invoiceNo: 'INV-2026-934', vendorId: 'v2', productId: 'p4', qty: 2000, rate: 11.9 },
  { id: 'TXN-035', date: '2026-04-22', invoiceNo: 'INV-2026-935', vendorId: 'v3', productId: 'p5', qty: 400, rate: 36.0 },
  { id: 'TXN-036', date: '2026-04-21', invoiceNo: 'INV-2026-936', vendorId: 'v4', productId: 'p6', qty: 1500, rate: 14.5 },
  { id: 'TXN-037', date: '2026-04-20', invoiceNo: 'INV-2026-937', vendorId: 'v5', productId: 'p7', qty: 2800, rate: 6.4 },
  { id: 'TXN-038', date: '2026-04-19', invoiceNo: 'INV-2026-938', vendorId: 'v6', productId: 'p8', qty: 4200, rate: 4.4 },
  { id: 'TXN-039', date: '2026-04-18', invoiceNo: 'INV-2026-939', vendorId: 'v7', productId: 'p9', qty: 4800, rate: 7.1 },
  { id: 'TXN-040', date: '2026-04-17', invoiceNo: 'INV-2026-940', vendorId: 'v8', productId: 'p10', qty: 700, rate: 23.0 },
  { id: 'TXN-041', date: '2026-04-16', invoiceNo: 'INV-2026-941', vendorId: 'v1', productId: 'p11', qty: 2200, rate: 4.9 },
  { id: 'TXN-042', date: '2026-04-15', invoiceNo: 'INV-2026-942', vendorId: 'v2', productId: 'p12', qty: 1100, rate: 8.2 },
  { id: 'TXN-043', date: '2026-04-14', invoiceNo: 'INV-2026-943', vendorId: 'v3', productId: 'p13', qty: 850, rate: 18.2 },
  { id: 'TXN-044', date: '2026-04-13', invoiceNo: 'INV-2026-944', vendorId: 'v4', productId: 'p14', qty: 1800, rate: 11.0 },
  { id: 'TXN-045', date: '2026-04-12', invoiceNo: 'INV-2026-945', vendorId: 'v5', productId: 'p15', qty: 600, rate: 93.0 },
  { id: 'TXN-046', date: '2026-04-11', invoiceNo: 'INV-2026-946', vendorId: 'v6', productId: 'p1', qty: 1900, rate: 8.6 },
  { id: 'TXN-047', date: '2026-04-10', invoiceNo: 'INV-2026-947', vendorId: 'v7', productId: 'p2', qty: 200, rate: 46.0 },
  { id: 'TXN-048', date: '2026-04-09', invoiceNo: 'INV-2026-948', vendorId: 'v8', productId: 'p3', qty: 90, rate: 860.0 },
  { id: 'TXN-049', date: '2026-04-08', invoiceNo: 'INV-2026-949', vendorId: 'v1', productId: 'p4', qty: 3200, rate: 11.5 },
  { id: 'TXN-050', date: '2026-04-07', invoiceNo: 'INV-2026-950', vendorId: 'v2', productId: 'p5', qty: 350, rate: 37.0 },
  { id: 'TXN-051', date: '2026-04-06', invoiceNo: 'INV-2026-951', vendorId: 'v3', productId: 'p6', qty: 1100, rate: 15.2 },
  { id: 'TXN-052', date: '2026-04-05', invoiceNo: 'INV-2026-952', vendorId: 'v4', productId: 'p7', qty: 3100, rate: 6.1 },
  { id: 'TXN-053', date: '2026-04-04', invoiceNo: 'INV-2026-953', vendorId: 'v5', productId: 'p8', qty: 4500, rate: 4.35 },
  { id: 'TXN-054', date: '2026-04-03', invoiceNo: 'INV-2026-954', vendorId: 'v6', productId: 'p9', qty: 5200, rate: 6.8 },
  { id: 'TXN-055', date: '2026-04-02', invoiceNo: 'INV-2026-955', vendorId: 'v7', productId: 'p10', qty: 800, rate: 21.0 }
];

export const MOCK_PURCHASES: Purchase[] = basePurchases.map(item => {
  const total = (item.qty || 0) * (item.rate || 0);
  return {
    ...item,
    total
  } as Purchase;
});

// Mock batches for expiry tracking. Make sure some are expired (daysLeft <= 0), critical (<30d), warning (30-90d), and safe (>90d).
export const MOCK_EXPIRY_BATCHES: ExpiryBatch[] = [
  { id: 'eb1', productId: 'p1', batchNo: 'B-AMX-901', expiryDate: '2026-08-30', daysLeft: 97, qty: 2500, status: 'safe' },
  { id: 'eb2', productId: 'p2', batchNo: 'B-PAR-002', expiryDate: '2026-06-15', daysLeft: 21, qty: 180, status: 'critical' },
  { id: 'eb3', productId: 'p3', batchNo: 'B-INS-441', expiryDate: '2026-07-20', daysLeft: 56, qty: 120, status: 'warning' },
  { id: 'eb4', productId: 'p4', batchNo: 'B-MET-889', expiryDate: '2026-11-10', daysLeft: 169, qty: 3200, status: 'safe' },
  { id: 'eb5', productId: 'p5', batchNo: 'B-AZI-223', expiryDate: '2026-05-10', daysLeft: -15, qty: 340, status: 'expired' },
  { id: 'eb6', productId: 'p6', batchNo: 'B-CIP-778', expiryDate: '2026-06-08', daysLeft: 14, qty: 850, status: 'critical' },
  { id: 'eb7', productId: 'p7', batchNo: 'B-ATOR-31', expiryDate: '2026-08-10', daysLeft: 77, qty: 4500, status: 'warning' },
  { id: 'eb8', productId: 'p8', batchNo: 'B-IBU-550', expiryDate: '2026-04-18', daysLeft: -37, qty: 1100, status: 'expired' },
  { id: 'eb9', productId: 'p9', batchNo: 'B-PAN-012', expiryDate: '2027-01-15', daysLeft: 235, qty: 6000, status: 'safe' },
  { id: 'eb10', productId: 'p10', batchNo: 'B-MON-780', expiryDate: '2026-06-22', daysLeft: 28, qty: 950, status: 'critical' },
  { id: 'eb11', productId: 'p11', batchNo: 'B-AML-449', expiryDate: '2026-07-02', daysLeft: 38, qty: 1300, status: 'warning' },
  { id: 'eb12', productId: 'p12', batchNo: 'B-CET-112', expiryDate: '2026-09-12', daysLeft: 110, qty: 750, status: 'safe' }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', type: 'expiry', title: 'Critical Expiry Alert', message: 'Batch B-PAR-002 (Paracetamol Syrup) is expiring in 21 days. Action required.', read: false, timestamp: '2026-05-25T10:30:00Z' },
  { id: 'n2', type: 'stock', title: 'Low Stock Alert', message: 'Montelukast 10mg stock has fallen below reorder level (Active stock: 980).', read: false, timestamp: '2026-05-25T09:15:00Z' },
  { id: 'n3', type: 'expiry', title: 'Expired Batches Detected', message: 'Batch B-AZI-223 (Azithromycin) has expired. Quarantining batch.', read: true, timestamp: '2026-05-24T18:00:00Z' },
  { id: 'n4', type: 'vendor', title: 'Vendor Score Restructured', message: 'Zenith Medical Supplies score dropped to 78% due to late delivery.', read: true, timestamp: '2026-05-23T14:45:00Z' },
  { id: 'n5', type: 'system', title: 'System Backup Complete', message: 'Database backup for 1M+ daily purchase records successfully uploaded.', read: true, timestamp: '2026-05-25T00:01:00Z' }
];
