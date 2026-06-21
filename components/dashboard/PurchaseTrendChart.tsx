'use client';

import * as React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { formatCurrency } from '@/lib/utils';

// Generate 30 days of rolling data
const generateTrendData = () => {
  const data = [];
  const startDay = 1;
  for (let i = 0; i < 30; i++) {
    const dayVal = startDay + i;
    const dateStr = `${dayVal < 10 ? '0' : ''}${dayVal} OCT`;
    const volume = Math.floor(Math.sin(i / 2) * 300 + 800 + Math.random() * 200);
    const revenue = volume * (120 + Math.random() * 40);
    data.push({
      date: dateStr,
      volume,
      revenue
    });
  }
  return data;
};

const trendData = generateTrendData();

export default function PurchaseTrendChart() {
  const [metric, setMetric] = React.useState<'volume' | 'revenue'>('volume');

  return (
    <div className="bg-surface-container p-6 md:p-8 clinical-border shadow-clinical rounded-clinical transition-shadow duration-300 hover:shadow-clinical-md">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <h3 className="font-headline-md text-headline-md text-on-surface">Purchase Trends</h3>
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-primary/10 rounded-full border border-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary glow-success animate-pulse"></span>
            <span className="text-[9px] font-bold text-primary uppercase tracking-wider">LIVE FEED</span>
          </div>
        </div>

        <div className="flex bg-surface-container-low border border-outline p-1 rounded-clinical self-start sm:self-auto">
          <button
            onClick={() => setMetric('volume')}
            className={`px-4 py-1 text-[10px] font-bold rounded font-label-caps transition-all ${
              metric === 'volume'
                ? 'bg-primary text-background'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            VOLUME
          </button>
          <button
            onClick={() => setMetric('revenue')}
            className={`px-4 py-1 text-[10px] font-bold rounded font-label-caps transition-all ${
              metric === 'revenue'
                ? 'bg-primary text-background'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            REVENUE
          </button>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#64748B"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              stroke="#64748B"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => {
                if (metric === 'revenue') {
                  return `₹${(val / 1000).toFixed(0)}K`;
                }
                return val.toLocaleString();
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                borderColor: '#E2E8F0',
                borderRadius: '6px',
                boxShadow: '0 4px 12px rgba(15, 30, 46, 0.08)',
                fontFamily: 'IBM Plex Sans, sans-serif'
              }}
              labelStyle={{ color: '#0F1E2E', fontWeight: 'bold', fontSize: '12px' }}
              itemStyle={{ color: '#0D9488', fontSize: '12px' }}
              formatter={(value: any) => {
                if (metric === 'revenue') {
                  return [formatCurrency(value), 'Revenue'];
                }
                return [value.toLocaleString() + ' units', 'Volume'];
              }}
            />
            <Line
              type="monotone"
              dataKey={metric}
              stroke="#0D9488"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, stroke: '#0D9488', strokeWidth: 2, fill: '#FFFFFF' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between mt-4 text-on-surface-variant/60 font-label-caps text-[9px] tracking-wider uppercase">
        <span>01 OCT</span>
        <span>10 OCT</span>
        <span>20 OCT</span>
        <span>30 OCT</span>
      </div>
    </div>
  );
}
