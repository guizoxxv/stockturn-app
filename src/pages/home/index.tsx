import React, { useCallback } from 'react'
import { Header } from '../../shared/components/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ProductsTable } from './components/productsTable';
import { Paginator } from '../../shared/components/paginator';
import $ from 'jquery';
import { CreateProductModal } from './components/createProductModal';

export const Home: React.FC = () => {
  const handleCreateProduct = useCallback(() => {
    $('#createProductModal').modal('show');
  }, []);

  return (
    <>
    <Header />
    <main className="container">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h4 className="mb-0">Products List</h4>
        <div className="d-flex align-items-center justify-content-center flex-wrap">
          <button className="btn btn-info m-1">
            <FontAwesomeIcon icon={faFilter} size="1x" className="mr-1" />
            <span className="mr-1">Filter</span>
            <span className="badge bg-secondary">4</span>
          </button>
          <button
            className="btn btn-success m-1"
            onClick={handleCreateProduct}
          >
            <FontAwesomeIcon icon={faPlus} size="1x" className="mr-1" />
            Create
          </button>
        </div>
      </div>
      <ProductsTable />
      <Paginator />
    </main>
    <CreateProductModal />
    </>
  );
}