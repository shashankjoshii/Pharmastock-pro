import { useState, useMemo } from 'react';

interface UsePaginationProps<T> {
  data: T[];
  initialPageSize?: number;
}

export function usePagination<T>({ data, initialPageSize = 10 }: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalRecords = data.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));

  // Reset page if bounds change
  const activePage = Math.min(currentPage, totalPages);

  const paginatedData = useMemo(() => {
    const start = (activePage - 1) * pageSize;
    const end = start + pageSize;
    return data.slice(start, end);
  }, [data, activePage, pageSize]);

  const startRecord = totalRecords === 0 ? 0 : (activePage - 1) * pageSize + 1;
  const endRecord = Math.min(activePage * pageSize, totalRecords);

  const nextPage = () => {
    if (activePage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (activePage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return {
    currentPage: activePage,
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
    hasPrev: activePage > 1,
    hasNext: activePage < totalPages,
  };
}
