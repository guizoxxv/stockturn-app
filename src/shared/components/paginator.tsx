import React, { useCallback, useContext } from 'react';
import { PaginationContext } from '../../context/pagination';
import { ProductContext } from '../../context/product';

export const Paginator: React.FC = () => {
  const { pagination } = useContext(PaginationContext);
  const { filters, setFilters } = useContext(ProductContext);

  const handleSetPage = useCallback(async (page: number) => {
    setFilters({
      ...filters,
      page,
    });
  }, [filters, setFilters]);

  return (
    <div className="d-flex align-items-center justify-content-center">
      <nav aria-label="Products pagination">
        <ul className="pagination">
          <li className="page-item" title="First page">
            <button
              className="page-link"
              aria-label="Previous"
              onClick={() => handleSetPage(1)}
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {pagination?.links?.filter((link => parseInt(link.label)))
            .map((link, index) => (
            <li key={index} className={`page-item ${link.active ? 'active' : ''} ${link.url ? '' : 'disabled'}`}>
              <button
                className="page-link"
                onClick={() => handleSetPage(parseInt(link.label))}
                dangerouslySetInnerHTML={{ __html: link.label }}
              >
              </button>
            </li>
          ))}
          <li className="page-item" title="Last page">
            <button
              className="page-link"
              aria-label="Next"
              onClick={() => handleSetPage(pagination.last_page)}
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}