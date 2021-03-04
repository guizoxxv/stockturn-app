import { faEye, faFilter, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Header } from '../../shared/components/header';
import { Product } from '../../shared/interfaces/product.interface';
import { getProductsRequest } from '../../services/api';
import { Pagination } from '../../shared/interfaces/pagination.interface';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pagination>({} as Pagination);

  const handleFetchPageData = useCallback(async (link: string|null) => {
    try {
      const response = await getProductsRequest(link);
      console.log(response);

      const {
        data,
        current_page,
        first_page_url,
        from,
        last_page,
        last_page_url,
        links,
        next_page_url,
        path,
        per_page,
        prev_page_url,
        to,
        total,
      } = response;

      setProducts(data);
      setPagination({
        current_page,
        first_page_url,
        from,
        last_page,
        last_page_url,
        links,
        next_page_url,
        path,
        per_page,
        prev_page_url,
        to,
        total,
      })
    } catch (err) {
      console.error('Fail to get products');
    }
  }, []);

  useEffect(() => {
    handleFetchPageData(null);
  }, [handleFetchPageData]);

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
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr className="text-center">
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Stock</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="text-center">
                <th scope="row" className="text-center">{product.id}</th>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <Link className="btn btn-sm btn-primary m-1" to="" title="View">
                    <FontAwesomeIcon icon={faEye} size="1x" />
                  </Link>
                  <Link className="btn btn-sm btn-secondary m-1" to="" title="Edit">
                    <FontAwesomeIcon icon={faPencilAlt} size="1x" />
                  </Link>
                  <Link className="btn btn-sm btn-danger m-1" to="" title="Delete">
                    <FontAwesomeIcon icon={faTrash} size="1x" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
    </main>
    </>
  );
}

export default Home;