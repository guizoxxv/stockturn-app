import React, { createContext, useState } from 'react';
import { Pagination } from '../shared/interfaces/pagination.interface';

interface PaginationContextData {
  pagination: Pagination,
  setPagination(pagination: Pagination): void,
}

export const PaginationContext = createContext<PaginationContextData>(
  {} as PaginationContextData
);

export const PaginationProvider: React.FC = ({ children }) => {
  const [pagination, setPagination] = useState<Pagination>({} as Pagination);

  return (
    <PaginationContext.Provider
      value={{
        pagination,
        setPagination,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};