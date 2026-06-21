'use client';

import * as React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';

const data = [
  { name: 'AMOXICILLIN 500MG', units: 1240 },
  { name: 'PARACETAMOL SYRUP', units: 980 },
  { name: 'INSULIN GLARGINE', units: 745 },
  { name: 'METFORMIN 1000MG', units: 610 },
  { name: 'AZITHROMYCIN 250MG', units: 540 }
];

export default function TopProductsChart() {
  return (
    <div className="bg-surface-container p-6 md:p-8 clinical-border shadow-clinical rounded-clinical transition-shadow duration-300 hover:shadow-clinical-md">
      <h3 className="font-headline-md text-headline-md text-on-surface mb-8">Top 5 Purchased Products</h3>

      <div className="h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 15, left: 30, bottom: 5 }}
          >
            <XAxis
              type="number"
              stroke="#64748B"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `${val}`}
            />
            <YAxis
              dataKey="name"
              type="category"
              stroke="#0F1E2E"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              width={110}
              tickFormatter={(value) => {
                // Shorten labels if necessary
                return value.length > 18 ? `${value.substring(0, 15)}...` : value;
              }}
            />
            <Tooltip
              cursor={{ fill: 'rgba(13, 148, 136, 0.06)' }}
              contentStyle={{
                backgroundColor: '#FFFFFF',
                borderColor: '#E2E8F0',
                borderRadius: '6px',
                boxShadow: '0 4px 12px rgba(15, 30, 46, 0.08)',
                fontFamily: 'IBM Plex Sans, sans-serif'
              }}
              labelStyle={{ color: '#0F1E2E', fontWeight: 'bold', fontSize: '12px' }}
              itemStyle={{ color: '#0D9488', fontSize: '12px' }}
              formatter={(value: any) => [`${value} units`, 'Purchased']}
            />
            <Bar
              dataKey="units"
              fill="#0D9488"
              radius={[0, 4, 4, 0]}
              barSize={12}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#0D9488" className="transition-all duration-300 hover:opacity-80" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
