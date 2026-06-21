'use client';

import * as React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Safe (> 6 months)', value: 70, color: '#0D9488' }, // Accent
  { name: 'Warning (3-6 months)', value: 15, color: '#D97706' }, // Warning
  { name: 'Critical (< 30 days)', value: 15, color: '#DC2626' }  // Danger
];

export default function ExpiryDonutChart() {
  return (
    <div className="bg-surface-container p-6 md:p-8 clinical-border shadow-clinical rounded-clinical transition-shadow duration-300 hover:shadow-clinical-md">
      <h3 className="font-headline-md text-headline-md text-on-surface mb-8">Expiry Risk Distribution</h3>
      
      <div className="flex flex-col sm:flex-row items-center justify-around gap-6 h-60">
        {/* Pie/Donut Chart Container */}
        <div className="relative w-40 h-40 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={2} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          {/* Overlay elements in the donut center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="font-kpi-numeric text-headline-lg font-bold text-on-surface leading-none">100%</span>
            <span className="text-[8px] font-label-caps text-on-surface-variant tracking-widest mt-1">AUDITED</span>
          </div>
        </div>

        {/* Legend listing */}
        <div className="space-y-4 flex-1 w-full max-w-[200px]">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-body-sm">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-on-surface-variant font-medium text-xs">{item.name}</span>
              </div>
              <span className="font-mono-data text-xs text-on-surface font-semibold pl-2">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
