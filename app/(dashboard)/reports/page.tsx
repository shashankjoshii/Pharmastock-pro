'use client';

import * as React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/Select';
import { Calendar } from '@/components/ui/Calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/Popover';
import { FileText, Download, Calendar as CalendarIcon, CheckCircle2, RefreshCw } from 'lucide-react';

interface ReportFile {
  title: string;
  description: string;
  size: string;
  generatedAt: string;
  formats: ('pdf' | 'excel' | 'csv')[];
}

const standardReports: ReportFile[] = [
  {
    title: 'INVENTORY STOCK AUDIT LEDGER',
    description: 'Comprehensive physical inventory levels, safety thresholds, and reorder alerts.',
    size: '2.4 MB',
    generatedAt: 'Today, 06:00 AM',
    formats: ['pdf', 'excel', 'csv']
  },
  {
    title: 'EXPIRY FORECAST & RISK AUDIT',
    description: 'Detailed analysis of expiring batches, days remaining, and quarantined records.',
    size: '1.8 MB',
    generatedAt: 'Yesterday, 10:30 PM',
    formats: ['pdf', 'excel']
  },
  {
    title: 'SUPPLIER PROCUREMENT SUMMARY',
    description: 'Quarterly financial statements detailing transaction volumes and supplier accreditations.',
    size: '4.1 MB',
    generatedAt: '15-Oct-2026',
    formats: ['excel', 'csv']
  }
];

export default function ReportsPage() {
  // Custom compilation state
  const [reportType, setReportType] = React.useState('Stock Status');
  const [compDate, setCompDate] = React.useState<Date | undefined>(new Date());
  const [format, setFormat] = React.useState('PDF Document');
  const [compiling, setCompiling] = React.useState(false);
  const [compileSuccess, setCompileSuccess] = React.useState(false);

  const handleCompile = (e: React.FormEvent) => {
    e.preventDefault();
    setCompiling(true);
    setCompileSuccess(false);

    setTimeout(() => {
      setCompiling(false);
      setCompileSuccess(true);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Reports & Exports"
        description="Compile and download audited logs, supply chain forecasts, and vendor listings."
      />

      {/* Main Grid: Left list of standard files, Right custom form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Standard downloadable reports list (2 columns wide) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface-container p-6 border border-outline/70 rounded-clinical">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-6">Standard Audit Exports</h3>
            
            <div className="divide-y divide-outline-variant/40 space-y-4">
              {standardReports.map((rep, idx) => (
                <div key={idx} className={`pt-4 ${idx === 0 ? 'pt-0' : ''} flex flex-col md:flex-row justify-between items-start md:items-center gap-4`}>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-label-caps text-label-caps text-on-surface font-bold text-xs">{rep.title}</h4>
                      <p className="text-body-sm text-on-surface-variant/80 text-xs mt-1 max-w-md">{rep.description}</p>
                      <div className="flex items-center gap-4 text-[10px] text-text-muted mt-2 font-mono-data">
                        <span>SIZE: {rep.size}</span>
                        <span>GENERATED: {rep.generatedAt}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-auto">
                    {rep.formats.map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => console.log(`Downloading ${rep.title} as ${fmt.toUpperCase()}`)}
                        className="flex items-center gap-1 px-2.5 py-1.5 bg-surface-container-high border border-outline hover:border-accent hover:text-accent font-label-caps text-[9px] rounded-clinical active:scale-95 transition-all text-on-surface-variant font-bold uppercase"
                      >
                        <Download className="h-3 w-3" />
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audit events feed */}
          <div className="bg-surface-container p-6 border border-outline/70 rounded-clinical">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Export Ledger History</h3>
            <div className="space-y-3 font-mono-data text-xs">
              <div className="p-3 bg-surface-container-low/40 rounded border border-outline/35 flex justify-between">
                <span className="text-on-surface-variant">System compiled STOCK_AUDIT_Q3.csv successfully</span>
                <span className="text-text-muted">Today, 06:01 AM</span>
              </div>
              <div className="p-3 bg-surface-container-low/40 rounded border border-outline/35 flex justify-between">
                <span className="text-on-surface-variant">Operator John Doe exported EXPIRY_REPORT_CRITICAL.pdf</span>
                <span className="text-text-muted">Yesterday, 04:15 PM</span>
              </div>
              <div className="p-3 bg-surface-container-low/40 rounded border border-outline/35 flex justify-between">
                <span className="text-on-surface-variant">System auto-generated SUPP_AUDIT_OCT26.xlsx</span>
                <span className="text-text-muted">15-Oct-2026, 12:00 AM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Compile Custom Ledger Form (1 column wide) */}
        <div>
          <div className="bg-surface-container p-6 border border-outline/70 rounded-clinical sticky top-24">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Compile Custom Ledger</h3>
            <p className="text-body-sm text-on-surface-variant/80 text-xs mb-6">
              Select ledger variables and parameter spans to generate custom pharmaceutical spreadsheets.
            </p>

            <form onSubmit={handleCompile} className="space-y-4">
              {/* Report Type */}
              <div className="space-y-1.5">
                <label className="font-label-caps text-[10px] text-on-surface-variant block uppercase font-semibold">
                  Ledger Objective
                </label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Stock Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Stock Status">Inventory Stock Tally</SelectItem>
                    <SelectItem value="Expiry Timeline">Expiry Danger Distribution</SelectItem>
                    <SelectItem value="Procurement Volume">Supplier Purchase Records</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Target Month Datepicker */}
              <div className="space-y-1.5">
                <label className="font-label-caps text-[10px] text-on-surface-variant block uppercase font-semibold">
                  Parameters Threshold Date
                </label>
                <Popover>
                  <PopoverTrigger className="flex h-10 w-full items-center justify-between border border-outline bg-surface-container-low px-3 py-2 text-body-sm text-on-surface rounded-clinical focus:outline-none focus:ring-1 focus:ring-accent">
                    <span className="flex items-center gap-2 truncate text-on-surface-variant/80">
                      <CalendarIcon className="h-4 w-4 text-accent flex-shrink-0" />
                      {compDate ? compDate.toLocaleDateString('en-IN') : 'Select Date'}
                    </span>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      selected={compDate}
                      onSelect={setCompDate}
                      mode="single"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Format selection */}
              <div className="space-y-1.5">
                <label className="font-label-caps text-[10px] text-on-surface-variant block uppercase font-semibold">
                  Output Format
                </label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="PDF Document" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PDF Document">PDF Secure Document</SelectItem>
                    <SelectItem value="Excel Spreadsheet">Excel Spreadsheet (.xlsx)</SelectItem>
                    <SelectItem value="CSV Sheet">Raw CSV Ledger (.csv)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Compiler feedback */}
              {compileSuccess && (
                <div className="p-3 bg-success/15 border border-success/35 text-success rounded-clinical flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span className="text-[11px] leading-tight font-medium">
                    Ledger compiled successfully. Check system downloads directory for {reportType.toUpperCase().replace(/\s/g, '_')}_REPORT.
                  </span>
                </div>
              )}

              {/* Submit compilation */}
              <button
                type="submit"
                disabled={compiling}
                className="w-full h-11 bg-primary text-on-primary-container hover:opacity-90 active:scale-95 disabled:opacity-60 disabled:pointer-events-none font-label-caps text-label-caps text-[11px] font-bold rounded-clinical transition-all flex items-center justify-center gap-2 uppercase tracking-widest mt-6"
              >
                {compiling ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    COMPILING AUDIT...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4" />
                    COMPILE LEDGER
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
