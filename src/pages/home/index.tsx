import React from 'react'
import { Header } from '../../shared/components/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { ProductsTable } from './components/productsTable';
import { Paginator } from '../../shared/components/paginator';

export const Home: React.FC = () => {
  return (
    <>
    <Header />
    <main className="container">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h4 className="mb-0">Products List</h4>
        <button className="btn btn-info">
          <FontAwesomeIcon icon={faFilter} size="1x" className="mr-1" />
          <span className="mr-1">Filter</span>
          <span className="badge bg-secondary">4</span>
        </button>
      </div>
      <ProductsTable />
      <Paginator />
    </main>
    </>
  );
}