import React, { useCallback, useContext } from 'react';
import { PaginationContext } from '../../context/pagination';
import { ProductContext } from '../../context/product';

export const Paginator: React.FC = () => {
  const { pagination } = useContext(PaginationContext);
  const { setFilters, getProducts } = useContext(ProductContext);

  const handleFetchPageData = useCallback(async (link: string|null) => {
    await getProducts(link);
  }, [getProducts]);

  return (
    <div className="d-flex align-items-center justify-content-center">
      <nav aria-label="Products pagination">
        <ul className="pagination">
          <li className="page-item" title="First page">
            <button
              className="page-link"
              aria-label="Previous"
              onClick={() => handleFetchPageData(pagination.first_page_url)}
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {pagination?.links?.map((link, index) => (
            <li key={index} className={`page-item ${link.active ? 'active' : ''} ${link.url ? '' : 'disabled'}`}>
              <button
                className="page-link"
                onClick={() => handleFetchPageData(link.url)}
                dangerouslySetInnerHTML={{ __html: link.label }}
              >
              </button>
            </li>
          ))}
          <li className="page-item" title="Last page">
            <button
              className="page-link"
              aria-label="Next"
              onClick={() => handleFetchPageData(pagination.last_page_url)}
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}