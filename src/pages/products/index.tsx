import React, { useCallback, useContext } from 'react'
import { Header } from '../../shared/components/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ProductsTable } from './components/productsTable';
import { Paginator } from '../../shared/components/paginator';
import $ from 'jquery';
import { CreateProductModal } from './components/createProductModal';
import { FilterProductsModal } from './components/filterProductsModal';
import { ProductContext } from '../../context/product';
import { UploadProductsCsvModal } from './components/uploadProductsCsvModal';
import { PaginationContext } from '../../context/pagination';

export const ProductsPage: React.FC = () => {
  const { filters } = useContext(ProductContext);
  const { pagination } = useContext(PaginationContext);

  const handleCreateProduct = useCallback(() => {
    $('#createProductModal').modal('show');
  }, []);

  const handleFilterProducts = useCallback(() => {
    $('#filterProductModal').modal('show');
  }, []);

  const getFiltersCount = useCallback((): number => {
    return Object.keys(filters).filter(key => {
      return !['page', 'limit'].includes(key);
    }).length;
  }, [filters]);

  const getTotalProductsCount = useCallback((): number => {
    return pagination.total || 0;
  }, [pagination]);

  return (
    <>
    <Header />
    <main className="container">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h4 className="mb-0">
          Products List
          <span className="badge bg-secondary ml-2">{getTotalProductsCount()}</span>
        </h4>
        <div className="d-flex align-items-center justify-content-center flex-wrap">
          <button
            className="btn btn-info m-1"
            onClick={handleFilterProducts}
          >
            <FontAwesomeIcon icon={faFilter} size="1x" className="mr-1" />
            <span className="mr-1">Filter</span>
            <span className="badge bg-secondary">{getFiltersCount()}</span>
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
    <UploadProductsCsvModal />
    <FilterProductsModal />
    </>
  );
}