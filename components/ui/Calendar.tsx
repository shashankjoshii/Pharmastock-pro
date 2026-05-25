'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CalendarProps {
  className?: string;
  selected?: Date | { from?: Date; to?: Date };
  onSelect?: (date: any) => void;
  mode?: 'single' | 'range';
}

export function Calendar({
  className,
  selected,
  onSelect,
  mode = 'single'
}: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const prevMonthDays = new Date(year, month, 0).getDate();
  const totalDaysToShow = 42; // 6 rows * 7 days

  const daysArray = React.useMemo(() => {
    const tempDays = [];
    
    // Fill previous month padding days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      tempDays.push({
        day: prevMonthDays - i,
        monthOffset: -1,
        date: new Date(year, month - 1, prevMonthDays - i)
      });
    }

    // Fill current month days
    for (let i = 1; i <= daysInMonth; i++) {
      tempDays.push({
        day: i,
        monthOffset: 0,
        date: new Date(year, month, i)
      });
    }

    // Fill next month padding days
    const remainingDays = totalDaysToShow - tempDays.length;
    for (let i = 1; i <= remainingDays; i++) {
      tempDays.push({
        day: i,
        monthOffset: 1,
        date: new Date(year, month + 1, i)
      });
    }

    return tempDays;
  }, [year, month, daysInMonth, firstDayIndex, prevMonthDays]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isSelected = (date: Date) => {
    if (!selected) return false;

    if (mode === 'single' && selected instanceof Date) {
      return date.toDateString() === selected.toDateString();
    }

    if (mode === 'range' && typeof selected === 'object' && !(selected instanceof Date)) {
      const { from, to } = selected as { from?: Date; to?: Date };
      if (from && date.toDateString() === from.toDateString()) return true;
      if (to && date.toDateString() === to.toDateString()) return true;
      if (from && to && date > from && date < to) return true;
    }

    return false;
  };

  const handleDateClick = (date: Date) => {
    if (!onSelect) return;

    if (mode === 'single') {
      onSelect(date);
    } else if (mode === 'range') {
      const rangeSelected = selected as { from?: Date; to?: Date } || {};
      if (!rangeSelected.from || (rangeSelected.from && rangeSelected.to)) {
        onSelect({ from: date, to: undefined });
      } else if (rangeSelected.from && !rangeSelected.to) {
        if (date < rangeSelected.from) {
          onSelect({ from: date, to: rangeSelected.from });
        } else {
          onSelect({ from: rangeSelected.from, to: date });
        }
      }
    }
  };

  const isToday = (date: Date) => {
    return date.toDateString() === new Date().toDateString();
  };

  return (
    <div className={cn("p-3 bg-surface-container rounded-clinical border border-outline", className)}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-label-caps text-label-caps text-on-surface">
          {monthNames[month]} {year}
        </h4>
        <div className="flex gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-1.5 border border-outline hover:border-accent rounded text-on-surface-variant hover:text-accent bg-surface-container-low transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-1.5 border border-outline hover:border-accent rounded text-on-surface-variant hover:text-accent bg-surface-container-low transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center font-label-caps text-[10px] text-text-muted mb-2">
        <span>SU</span>
        <span>MO</span>
        <span>TU</span>
        <span>WE</span>
        <span>TH</span>
        <span>FR</span>
        <span>SA</span>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {daysArray.map((dayObj, index) => {
          const selectedState = isSelected(dayObj.date);
          const rangeObj = mode === 'range' ? (selected as { from?: Date; to?: Date }) : null;
          const isInRange = rangeObj && rangeObj.from && rangeObj.to && dayObj.date > rangeObj.from && dayObj.date < rangeObj.to;
          
          return (
            <button
              key={index}
              onClick={() => handleDateClick(dayObj.date)}
              className={cn(
                "h-8 w-8 text-mono-data text-xs rounded transition-colors flex items-center justify-center relative",
                dayObj.monthOffset !== 0 ? "text-text-muted/40" : "text-on-surface-variant",
                isToday(dayObj.date) && "border border-accent/40",
                selectedState && "bg-accent text-background font-bold",
                isInRange && "bg-accent/15 text-accent rounded-none"
              )}
            >
              {dayObj.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
